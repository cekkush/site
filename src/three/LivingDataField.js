import * as THREE from 'three'

/**
 * LivingDataField
 * An interactive 3D "neural / data network": glowing nodes connected by
 * hairline links, drifting in space and visibly reacting to the pointer —
 * nodes are repelled by the cursor and flare up near it, a glowing cursor
 * light travels through the field, and the whole network parallaxes to the
 * mouse. It is the visual metaphor for an ERP: many moving parts, one
 * living system.
 */
export default class LivingDataField {
  constructor(canvas) {
    this.canvas = canvas
    this.mouse = new THREE.Vector2(0, 0) // eased NDC
    this.targetMouse = new THREE.Vector2(0, 0)
    this.scrollProgress = 0
    this.clock = new THREE.Clock()
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // cursor projected onto the z=0 plane, in world and group-local space
    this.cursorWorld = new THREE.Vector3()
    this.cursorLocal = new THREE.Vector3()
    this.cursorStrength = 0 // eases in while the pointer moves
    this._plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    this._ray = new THREE.Raycaster()

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
    this.scene.fog = new THREE.FogExp2(0x05060d, 0.045)

    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    this.camera.position.set(0, 0, 16)

    this.group = new THREE.Group()
    this.scene.add(this.group)

    this._buildNetwork()
    this._buildCursorLight()
    this._bind()
    this._loop()
  }

  _buildNetwork() {
    const isSmall = window.innerWidth < 768
    const COUNT = isSmall ? 120 : 230
    const RADIUS = 12

    const positions = []
    this.nodes = []
    for (let i = 0; i < COUNT; i++) {
      const r = RADIUS * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.72
      const z = r * Math.cos(phi)
      positions.push(x, y, z)
      this.nodes.push({
        base: new THREE.Vector3(x, y, z),
        speed: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const pGeo = new THREE.BufferGeometry()
    this.posAttr = new THREE.Float32BufferAttribute(positions, 3)
    this.posAttr.setUsage(THREE.DynamicDrawUsage)
    pGeo.setAttribute('position', this.posAttr)

    const sizes = new Float32Array(COUNT)
    const seeds = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      sizes[i] = 7 + Math.random() * 18
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
        uCursor: { value: new THREE.Vector3(999, 999, 999) },
        uCursorStrength: { value: 0 },
        uColorA: { value: new THREE.Color(0x8b6dff) },
        uColorB: { value: new THREE.Color(0x22d3ee) },
        uColorHot: { value: new THREE.Color(0xffffff) },
      },
      vertexShader: /* glsl */ `
        attribute float size;
        attribute float seed;
        uniform float uTime;
        uniform float uDpr;
        uniform vec3 uCursor;
        uniform float uCursorStrength;
        varying float vSeed;
        varying float vPulse;
        varying float vInfl;
        void main() {
          vSeed = seed;
          vec3 pos = position;

          // cursor repulsion + flare
          vec3 toC = pos - uCursor;
          float dC = length(toC);
          float infl = smoothstep(6.5, 0.0, dC) * uCursorStrength;
          vInfl = infl;
          pos += normalize(toC + 0.001) * infl * 2.6;

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          float pulse = 0.6 + 0.4 * sin(uTime * 1.6 + seed * 28.0);
          vPulse = pulse;
          gl_PointSize = size * uDpr * pulse * (1.0 + infl * 2.2) * (10.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorHot;
        varying float vSeed;
        varying float vPulse;
        varying float vInfl;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float core = smoothstep(0.5, 0.0, d);
          float glow = pow(core, 2.0);
          vec3 col = mix(uColorA, uColorB, vSeed);
          col = mix(col, uColorHot, vInfl * 0.8);
          float a = glow * (0.4 + 0.6 * vPulse) * (1.0 + vInfl * 1.5);
          gl_FragColor = vec4(col, a);
        }
      `,
    })
    this.points = new THREE.Points(pGeo, pMat)
    this.pMat = pMat
    this.group.add(this.points)

    // ---- Links ----
    const linkPositions = []
    const maxDist = isSmall ? 4.2 : 3.7
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
      color: 0x6451e0,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    this.links = new THREE.LineSegments(lGeo, lMat)
    this.group.add(this.links)
  }

  _buildCursorLight() {
    // A big soft additive sprite that rides on the cursor's world position,
    // making it feel like the pointer is energising the data field.
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3))
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uSize: { value: 520 * this.dpr },
        uOpacity: { value: 0 },
        uColor: { value: new THREE.Color(0x7c5cff) },
      },
      vertexShader: /* glsl */ `
        uniform float uSize;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * (10.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uColor;
        uniform float uOpacity;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float glow = pow(smoothstep(0.5, 0.0, d), 2.5);
          gl_FragColor = vec4(uColor, glow * uOpacity);
        }
      `,
    })
    this.cursorLight = new THREE.Points(geo, mat)
    this.cursorLightMat = mat
    // lives in world space (added to scene, not the rotating group)
    this.scene.add(this.cursorLight)
  }

  _bind() {
    this._onResize = () => this.resize()
    this._pointerActive = false
    this._onPointer = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -((e.clientY / window.innerHeight) * 2 - 1)
      this.targetMouse.set(x, y)
      this._pointerActive = true
    }
    this._onLeave = () => (this._pointerActive = false)
    window.addEventListener('resize', this._onResize)
    window.addEventListener('pointermove', this._onPointer, { passive: true })
    document.addEventListener('mouseleave', this._onLeave)
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

    this.mouse.lerp(this.targetMouse, 0.08)

    // ease cursor strength based on activity
    const targetStrength = this._pointerActive && !this.reduced ? 1 : 0
    this.cursorStrength += (targetStrength - this.cursorStrength) * 0.06

    // project cursor onto z=0 plane in world space
    this._ray.setFromCamera(this.mouse, this.camera)
    this._ray.ray.intersectPlane(this._plane, this.cursorWorld)
    if (this.cursorLight) {
      this.cursorLight.position.copy(this.cursorWorld)
      this.cursorLightMat.uniforms.uOpacity.value = 0.22 * this.cursorStrength
    }

    if (this.pMat) {
      this.pMat.uniforms.uTime.value = t
      this.pMat.uniforms.uCursorStrength.value = this.cursorStrength
      // cursor in group-local space (group rotates, so convert)
      this.cursorLocal.copy(this.cursorWorld)
      this.group.worldToLocal(this.cursorLocal)
      this.pMat.uniforms.uCursor.value.copy(this.cursorLocal)
    }

    // drift nodes (the "living" feel)
    if (!this.reduced) {
      const arr = this.posAttr.array
      for (let i = 0; i < this.nodes.length; i++) {
        const n = this.nodes[i]
        const i3 = i * 3
        arr[i3] = n.base.x + Math.sin(t * n.speed + n.phase) * 0.28
        arr[i3 + 1] = n.base.y + Math.cos(t * n.speed * 0.9 + n.phase) * 0.28
        arr[i3 + 2] = n.base.z + Math.sin(t * n.speed * 0.7 + n.phase) * 0.28
      }
      this.posAttr.needsUpdate = true
    }

    // stronger parallax toward the pointer + slow auto spin + scroll tilt
    const targetRY = this.mouse.x * 0.9 + t * 0.045
    const targetRX = -this.mouse.y * 0.6 + this.scrollProgress * 0.7
    this.group.rotation.y += (targetRY - this.group.rotation.y) * 0.06
    this.group.rotation.x += (targetRX - this.group.rotation.x) * 0.06

    this.camera.position.z = 16 - this.scrollProgress * 4
    this.renderer.render(this.scene, this.camera)
  }

  destroy() {
    cancelAnimationFrame(this._raf)
    window.removeEventListener('resize', this._onResize)
    window.removeEventListener('pointermove', this._onPointer)
    document.removeEventListener('mouseleave', this._onLeave)
    this.scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) o.material.dispose()
    })
    this.renderer.dispose()
  }
}
