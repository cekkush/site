<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['done'])
const { t } = useI18n()
const counter = ref(0)
const root = ref(null)
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (reduced) {
    counter.value = 100
    emit('done')
    return
  }

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(root.value, {
        yPercent: -100,
        duration: 1,
        ease: 'expo.inOut',
        onComplete: () => emit('done'),
      })
    },
  })

  // animated number 0 -> 100
  tl.to(
    counter,
    {
      value: 100,
      duration: 2.1,
      ease: 'power2.inOut',
      snap: { value: 1 },
      onUpdate: () => (counter.value = Math.round(counter.value)),
    },
    0,
  )

  // assemble the logo + node lines
  tl.fromTo(
    '.pl-node',
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'back.out(2)' },
    0.1,
  )
  tl.fromTo(
    '.pl-line',
    { strokeDashoffset: 200 },
    { strokeDashoffset: 0, duration: 1.4, stagger: 0.05, ease: 'power2.out' },
    0.2,
  )
  tl.fromTo(
    '.pl-word',
    { opacity: 0, y: 14, filter: 'blur(8px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
    0.5,
  )
  tl.to('.pl-bar-fill', { scaleX: 1, duration: 2.1, ease: 'power2.inOut' }, 0)
})
</script>

<template>
  <div
    ref="root"
    class="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink-950"
  >
    <!-- network glyph -->
    <svg viewBox="0 0 200 120" class="mb-8 h-28 w-44 overflow-visible">
      <g
        stroke="#7c5cff"
        stroke-width="1"
        fill="none"
        opacity="0.5"
        stroke-dasharray="200"
      >
        <line class="pl-line" x1="40" y1="30" x2="100" y2="60" />
        <line class="pl-line" x1="100" y1="60" x2="160" y2="30" />
        <line class="pl-line" x1="40" y1="90" x2="100" y2="60" />
        <line class="pl-line" x1="100" y1="60" x2="160" y2="90" />
        <line class="pl-line" x1="40" y1="30" x2="40" y2="90" />
        <line class="pl-line" x1="160" y1="30" x2="160" y2="90" />
      </g>
      <g fill="#a691ff">
        <circle class="pl-node" cx="40" cy="30" r="5" />
        <circle class="pl-node" cx="160" cy="30" r="5" />
        <circle class="pl-node" cx="40" cy="90" r="5" />
        <circle class="pl-node" cx="160" cy="90" r="5" />
        <circle class="pl-node" cx="100" cy="60" r="8" fill="#22d3ee" />
      </g>
    </svg>

    <div class="pl-word text-center">
      <div class="text-2xl font-semibold tracking-tight text-white">
        Şərq<span class="text-neon-400">Soft</span>
      </div>
      <div class="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/40">
        {{ t('preloader.tagline') }}
      </div>
    </div>

    <!-- progress -->
    <div class="mt-10 flex w-56 items-center gap-4">
      <div class="h-px flex-1 overflow-hidden bg-white/10">
        <div class="pl-bar-fill h-full origin-left scale-x-0 bg-gradient-to-r from-neon-500 to-cyan-glow" />
      </div>
      <div class="w-10 text-right font-mono text-sm text-white/70">
        {{ counter }}
      </div>
    </div>
  </div>
</template>
