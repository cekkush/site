<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'

const enabled = ref(false)
const hidden = ref(true)
const ring = ref(null)
const dot = ref(null)
const trail = ref([]) // particle DOM els
const TRAIL = 6
let cleanup = () => {}

onMounted(() => {
  const fine =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine) return

  enabled.value = true
  document.body.classList.add('has-custom-cursor')

  // wait a tick so refs exist
  requestAnimationFrame(() => {
    const ringX = gsap.quickTo(ring.value, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ring.value, 'y', { duration: 0.45, ease: 'power3' })
    const dotX = gsap.quickTo(dot.value, 'x', { duration: 0.08, ease: 'power2' })
    const dotY = gsap.quickTo(dot.value, 'y', { duration: 0.08, ease: 'power2' })

    const trailQ = trail.value.map((el, i) => ({
      x: gsap.quickTo(el, 'x', { duration: 0.3 + i * 0.08, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 0.3 + i * 0.08, ease: 'power3' }),
    }))

    const move = (e) => {
      if (hidden.value) hidden.value = false
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
      trailQ.forEach((q) => {
        q.x(e.clientX)
        q.y(e.clientY)
      })
    }

    const over = (e) => {
      const t = e.target.closest(
        'a, button, [data-cursor], input, textarea, .group, .svc, .quote, .pillar',
      )
      gsap.to(ring.value, {
        scale: t ? 2.2 : 1,
        borderColor: t ? 'rgba(139,109,255,1)' : 'rgba(139,109,255,0.7)',
        backgroundColor: t ? 'rgba(124,92,255,0.12)' : 'rgba(124,92,255,0)',
        duration: 0.35,
        ease: 'power3.out',
      })
      gsap.to(dot.value, { scale: t ? 0 : 1, duration: 0.3 })
    }

    const leave = () => (hidden.value = true)
    const down = () => gsap.to(ring.value, { scale: 0.8, duration: 0.2 })
    const up = () => gsap.to(ring.value, { scale: 1, duration: 0.3 })

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('mouseleave', leave)

    cleanup = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('mouseleave', leave)
      document.body.classList.remove('has-custom-cursor')
    }
  })
})

onBeforeUnmount(() => cleanup())
</script>

<template>
  <div
    v-if="enabled"
    class="cursor-layer pointer-events-none fixed inset-0 z-[9999]"
    :class="{ 'opacity-0': hidden }"
  >
    <!-- trailing particles -->
    <div
      v-for="i in TRAIL"
      :key="i"
      :ref="(el) => (trail[i - 1] = el)"
      class="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-400"
      :style="{ opacity: 0.5 - i * 0.06 }"
    />
    <!-- ring -->
    <div
      ref="ring"
      class="absolute left-0 top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-neon-400/70"
      style="mix-blend-mode: screen"
    />
    <!-- core -->
    <div
      ref="dot"
      class="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(139,109,255,0.9)]"
    />
  </div>
</template>

<style scoped>
.cursor-layer {
  transition: opacity 0.3s ease;
}
</style>
