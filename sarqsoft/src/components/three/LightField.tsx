'use client';

import {useMemo, useRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 *  Cosmic embers — sparse, small golden sparks drifting up from the
 *  horizon, reacting to the pointer. Subtle additive glow (tuned so it
 *  never blows out to white).
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
    float speed = 0.35 + aSeed * 0.9;
    p.y = mod(p.y + uTime * speed, h * 2.0) - h;
    p.x += sin(uTime * 0.25 + aSeed * 6.2831) * 0.4;
    p.z += cos(uTime * 0.2 + aSeed * 6.2831) * 0.4;
    p.xy += uMouse * (0.4 + aSeed * 1.0);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    // small points; size attenuates with distance
    gl_PointSize = uSize * (0.5 + aSeed) * (130.0 / -mv.z);

    float edge = smoothstep(-h, -h + 3.0, p.y) * (1.0 - smoothstep(h - 4.0, h, p.y));
    vAlpha = edge * (0.25 + 0.35 * (0.5 + 0.5 * sin(uTime * 1.6 + aSeed * 24.0)));
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
    // soft round spark with a brighter core
    float a = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.18, 0.0, d);
    vec3 col = mix(uColorA, uColorB, clamp(vAlpha * 1.6, 0.0, 1.0));
    col += core * 0.4;
    gl_FragColor = vec4(col, a * vAlpha * 0.5);
  }
`;

function Embers({count = 420}: {count?: number}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const target = useRef(new THREE.Vector2(0, 0));

  const {positions, seeds} = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
      seeds[i] = Math.random();
    }
    return {positions, seeds};
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: {value: 0},
      uMouse: {value: new THREE.Vector2(0, 0)},
      uSize: {value: 1.0},
      uColorA: {value: new THREE.Color('#e9a23f')},
      uColorB: {value: new THREE.Color('#ffd9a0')},
    }),
    [],
  );

  useFrame((state) => {
    if (!matRef.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;
    target.current.lerp(
      {x: state.pointer.x * 1.4, y: state.pointer.y * 0.9} as THREE.Vector2,
      0.04,
    );
    uniforms.uMouse.value.copy(target.current);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
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
 *  Sunrise — a focused warm glow + soft god-rays at the bottom-centre.
 *  Tuned to stay dark across most of the frame.
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
    vec2 origin = vec2(0.5, -0.04);
    vec2 d = uv - origin;
    float dist = length(d);
    float ang = atan(d.x, d.y);

    float rays = 0.5 + 0.5 * sin(ang * 16.0 + uTime * 0.22);
    rays *= 0.5 + 0.5 * sin(ang * 8.0 - uTime * 0.16);
    rays = pow(rays, 2.2);

    float fall = smoothstep(0.85, 0.0, dist);   // focused, dark elsewhere
    float core = smoothstep(0.27, 0.0, dist);    // the sun
    float band = smoothstep(0.34, 0.0, uv.y);    // warm dawn along the bottom
    float intensity = rays * fall * 0.16 + core * 0.52 + band * 0.2;

    vec3 warm = vec3(0.98, 0.6, 0.26);
    vec3 hot = vec3(1.0, 0.82, 0.52);
    vec3 col = mix(warm, hot, core);

    gl_FragColor = vec4(col, clamp(intensity, 0.0, 0.92));
  }
`;

function Sunrise() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({uTime: {value: 0}}), []);
  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });
  return (
    <mesh position={[0, -1, -6]} scale={[40, 26, 1]}>
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
