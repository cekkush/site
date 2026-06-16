import * as THREE from 'three'

/**
 * LivingDataField
 * An interactive 3D "neural / data network": glowing nodes connected by
 * hairline links, drifting in space, reacting to the pointer and scroll.
 * It is the visual metaphor for an ERP — many moving parts, one living system.
 */
export default class LivingDataField {
  constructor(canvas) {
    this.canvas = canvas
    this.mouse = new THREE.Vector2(0, 0)
    this.targetMouse = new THREE.Vector2(0, 0)
    this.scrollProgress = 0
    this.clock = new THREE.Clock()
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this._raf = null
    this._init()
  }

  _init() {
    const { clientWidth: w, clientHeight: h } = this.canvas

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.setSize(w, h, false)

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(0x05060d, 0.06)

    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    this.camera.position.set(0, 0, 16)

    this.group = new THREE.Group()
    this.scene.add(this.group)

    this._buildNetwork()
    this._bind()
    this._loop()
  }

  _buildNetwork() {
    // Node count scales down on small screens for performance.
    const isSmall = window.innerWidth < 768
    const COUNT = isSmall ? 90 : 170
    const RADIUS = 11

    const positions = []
    this.nodes = []
    for (let i = 0; i < COUNT; i++) {
      // Distribute inside a soft sphere with some clustering.
      const r = RADIUS * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.7
      const z = r * Math.cos(phi)
      positions.push(x, y, z)
      this.nodes.push({
        base: new THREE.Vector3(x, y, z),
        speed: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      })
    }

    // ---- Points (glowing nodes) ----
    const pGeo = new THREE.BufferGeometry()
    this.posAttr = new THREE.Float32BufferAttribute(positions, 3)
    this.posAttr.setUsage(THREE.DynamicDrawUsage)
    pGeo.setAttribute('position', this.posAttr)

    const sizes = new Float32Array(COUNT)
    const seeds = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      sizes[i] = 6 + Math.random() * 16
      seeds[i] = Math.random()
    }
    pGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    pGeo.setAttribute('seed', new THREE.BufferAttribute(seeds, 1))

    const pMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uDpr: { value: this.dpr },
        uColorA: { value: new THREE.Color(0x8b6dff) },
        uColorB: { value: new THREE.Color(0x22d3ee) },
      },
      vertexShader: /* glsl */ `
        attribute float size;
        attribute float seed;
        uniform float uTime;
        uniform float uDpr;
        varying float vSeed;
        varying float vPulse;
        void main() {
          vSeed = seed;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float pulse = 0.6 + 0.4 * sin(uTime * 1.6 + seed * 28.0);
          vPulse = pulse;
          gl_PointSize = size * uDpr * pulse * (10.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying float vSeed;
        varying float vPulse;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float core = smoothstep(0.5, 0.0, d);
          float glow = pow(core, 2.2);
          vec3 col = mix(uColorA, uColorB, vSeed);
          float a = glow * (0.35 + 0.65 * vPulse);
          gl_FragColor = vec4(col, a);
        }
      `,
    })
    this.points = new THREE.Points(pGeo, pMat)
    this.pMat = pMat
    this.group.add(this.points)

    // ---- Links (hairline connections between near nodes) ----
    const linkPositions = []
    const maxDist = isSmall ? 4.2 : 3.6
    const maxLinks = 3
    for (let i = 0; i < COUNT; i++) {
      let made = 0
      const a = this.nodes[i].base
      for (let j = i + 1; j < COUNT && made < maxLinks; j++) {
        const b = this.nodes[j].base
        if (a.distanceTo(b) < maxDist) {
          linkPositions.push(a.x, a.y, a.z, b.x, b.y, b.z)
          made++
        }
      }
    }
    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linkPositions, 3),
    )
    const lMat = new THREE.LineBasicMaterial({
      color: 0x5b4bd6,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    this.links = new THREE.LineSegments(lGeo, lMat)
    this.linkPairs = linkPositions.length / 6
    this.group.add(this.links)
  }

  _bind() {
    this._onResize = () => this.resize()
    this._onPointer = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -((e.clientY / window.innerHeight) * 2 - 1)
      this.targetMouse.set(x, y)
    }
    window.addEventListener('resize', this._onResize)
    window.addEventListener('pointermove', this._onPointer, { passive: true })
  }

  setScroll(p) {
    this.scrollProgress = p
  }

  resize() {
    const w = this.canvas.clientWidth
    const h = this.canvas.clientHeight
    if (!w || !h) return
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h, false)
  }

  _loop() {
    this._raf = requestAnimationFrame(() => this._loop())
    const t = this.clock.getElapsedTime()

    // Smooth pointer easing
    this.mouse.lerp(this.targetMouse, 0.05)

    if (this.pMat) this.pMat.uniforms.uTime.value = t

    // Drift nodes subtly around their base position (the "living" feel)
    if (!this.reduced) {
      const arr = this.posAttr.array
      for (let i = 0; i < this.nodes.length; i++) {
        const n = this.nodes[i]
        const i3 = i * 3
        arr[i3] = n.base.x + Math.sin(t * n.speed + n.phase) * 0.25
        arr[i3 + 1] = n.base.y + Math.cos(t * n.speed * 0.9 + n.phase) * 0.25
        arr[i3 + 2] = n.base.z + Math.sin(t * n.speed * 0.7 + n.phase) * 0.25
      }
      this.posAttr.needsUpdate = true
    }

    // Parallax: rotate group toward pointer + slow auto spin + scroll tilt
    const targetRY = this.mouse.x * 0.5 + t * 0.04
    const targetRX = -this.mouse.y * 0.35 + this.scrollProgress * 0.6
    this.group.rotation.y += (targetRY - this.group.rotation.y) * 0.05
    this.group.rotation.x += (targetRX - this.group.rotation.x) * 0.05

    // Subtle dolly on scroll for cinematic depth
    this.camera.position.z = 16 - this.scrollProgress * 4

    this.renderer.render(this.scene, this.camera)
  }

  destroy() {
    cancelAnimationFrame(this._raf)
    window.removeEventListener('resize', this._onResize)
    window.removeEventListener('pointermove', this._onPointer)
    this.scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) o.material.dispose()
    })
    this.renderer.dispose()
  }
}
