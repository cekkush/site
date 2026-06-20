'use client';

import {useMemo, useRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 *  Cosmic embers — golden particles drifting up from the horizon,
 *  reacting to the pointer. Custom GLSL, additive blending.
 * ------------------------------------------------------------------ */

const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uSize;
  attribute float aSeed;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    float h = 10.0;
    float speed = 0.6 + aSeed * 1.4;
    p.y = mod(p.y + uTime * speed, h * 2.0) - h;
    p.x += sin(uTime * 0.3 + aSeed * 6.2831) * 0.35;
    p.z += cos(uTime * 0.24 + aSeed * 6.2831) * 0.35;
    // pointer parallax — nearer particles move more
    p.xy += uMouse * (0.5 + aSeed * 1.2);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.4 + aSeed) * (320.0 / -mv.z);

    float edge = smoothstep(-h, -h + 3.0, p.y) * (1.0 - smoothstep(h - 4.0, h, p.y));
    vAlpha = edge * (0.45 + 0.55 * sin(uTime * 2.0 + aSeed * 24.0));
  }
`;

const particleFragment = /* glsl */ `
  precision highp float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float a = smoothstep(0.5, 0.0, d);
    vec3 col = mix(uColorA, uColorB, clamp(vAlpha, 0.0, 1.0));
    gl_FragColor = vec4(col, a * vAlpha);
  }
`;

function Embers({count = 1100}: {count?: number}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const target = useRef(new THREE.Vector2(0, 0));

  const {positions, seeds} = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
      seeds[i] = Math.random();
    }
    return {positions, seeds};
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: {value: 0},
      uMouse: {value: new THREE.Vector2(0, 0)},
      uSize: {value: 26},
      uColorA: {value: new THREE.Color('#ecb24c')},
      uColorB: {value: new THREE.Color('#ff7d55')},
    }),
    [],
  );

  useFrame((state) => {
    if (!matRef.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;
    // smooth pointer follow
    target.current.lerp(
      {x: state.pointer.x * 1.6, y: state.pointer.y * 1.0} as THREE.Vector2,
      0.04,
    );
    uniforms.uMouse.value.copy(target.current);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ *
 *  God-rays + rising sun — a full-bleed plane behind the embers.
 * ------------------------------------------------------------------ */

const glowVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 origin = vec2(0.5, -0.08);
    vec2 d = uv - origin;
    float dist = length(d);
    float ang = atan(d.x, d.y);

    // soft volumetric rays
    float rays = 0.5 + 0.5 * sin(ang * 18.0 + uTime * 0.25);
    rays *= 0.5 + 0.5 * sin(ang * 9.0 - uTime * 0.18);
    rays = pow(rays, 1.6);

    float fall = smoothstep(1.15, 0.05, dist);
    float core = smoothstep(0.42, 0.0, dist);     // the sun
    float intensity = rays * fall * 0.5 + core * 0.9;

    vec3 cool = vec3(0.015, 0.02, 0.05);
    vec3 warm = vec3(0.98, 0.64, 0.30);
    vec3 hot = vec3(1.0, 0.86, 0.55);
    vec3 col = mix(warm, hot, core);
    col = mix(cool, col, clamp(intensity, 0.0, 1.0));

    gl_FragColor = vec4(col, clamp(intensity, 0.0, 1.0));
  }
`;

function Sunrise() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({uTime: {value: 0}}), []);
  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });
  return (
    <mesh position={[0, 0, -6]} scale={[44, 30, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={glowVertex}
        fragmentShader={glowFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function LightField() {
  return (
    <Canvas
      gl={{antialias: true, alpha: true, powerPreference: 'high-performance'}}
      camera={{position: [0, 0, 13], fov: 60}}
      dpr={[1, 2]}
      style={{position: 'absolute', inset: 0}}
    >
      <Sunrise />
      <Embers />
    </Canvas>
  );
}
