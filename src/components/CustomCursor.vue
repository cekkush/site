<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'

const dot = ref(null)
const ring = ref(null)
const hidden = ref(true)
let enabled = false
let cleanup = () => {}

onMounted(() => {
  const fine =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine) return

  enabled = true
  document.body.classList.add('has-custom-cursor')

  const dotX = gsap.quickTo(dot.value, 'x', { duration: 0.12, ease: 'power3' })
  const dotY = gsap.quickTo(dot.value, 'y', { duration: 0.12, ease: 'power3' })
  const ringX = gsap.quickTo(ring.value, 'x', { duration: 0.5, ease: 'power3' })
  const ringY = gsap.quickTo(ring.value, 'y', { duration: 0.5, ease: 'power3' })

  const move = (e) => {
    if (hidden.value) hidden.value = false
    dotX(e.clientX)
    dotY(e.clientY)
    ringX(e.clientX)
    ringY(e.clientY)
  }

  const over = (e) => {
    const t = e.target.closest('a, button, [data-cursor], input, textarea, .group')
    gsap.to(ring.value, {
      scale: t ? 1.8 : 1,
      borderColor: t ? 'rgba(124,92,255,0.9)' : 'rgba(124,92,255,0.5)',
      backgroundColor: t ? 'rgba(124,92,255,0.08)' : 'transparent',
      duration: 0.3,
    })
    gsap.to(dot.value, { scale: t ? 0.4 : 1, duration: 0.3 })
  }

  const leave = () => (hidden.value = true)

  window.addEventListener('pointermove', move, { passive: true })
  window.addEventListener('pointerover', over, { passive: true })
  document.addEventListener('mouseleave', leave)

  cleanup = () => {
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerover', over)
    document.removeEventListener('mouseleave', leave)
    document.body.classList.remove('has-custom-cursor')
  }
})

onBeforeUnmount(() => cleanup())
</script>

<template>
  <div
    v-if="enabled"
    class="cursor-layer pointer-events-none fixed inset-0 z-[9999]"
    :class="{ 'opacity-0': hidden }"
  >
    <div
      ref="ring"
      class="absolute left-0 top-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-400/50"
    />
    <div
      ref="dot"
      class="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-300"
    />
  </div>
</template>

<style scoped>
.cursor-layer {
  transition: opacity 0.3s ease;
}
</style>
