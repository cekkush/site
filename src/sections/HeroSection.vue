<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from 'vue-i18n'
import SplitText from '../components/SplitText.vue'

const { t } = useI18n()
const root = ref(null)
let ctx

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ctx = gsap.context(() => {
    if (!reduced) {
      gsap.fromTo(
        '.hero-fade',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 1 },
      )
      // kinetic: headline words drift at different speeds on scroll
      gsap.to('.kin-1', {
        yPercent: -40, ease: 'none',
        scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.kin-2', {
        yPercent: -90, xPercent: 12, ease: 'none',
        scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.kin-3', {
        yPercent: -160, ease: 'none',
        scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.kin-ghost', {
        xPercent: -18, ease: 'none',
        scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
      })
    }
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section
    id="top"
    ref="root"
    class="relative min-h-[100svh] overflow-hidden"
  >
    <!-- giant ghost word, editorial backdrop -->
    <div
      class="kin-ghost pointer-events-none absolute -right-10 top-[18%] select-none font-display text-[26vw] font-black leading-none text-white/[0.025] sm:top-[20%]"
      aria-hidden="true"
    >
      ERP
    </div>

    <div class="container-x relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-28">
      <!-- top meta row -->
      <div class="hero-fade mb-10 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
        <span>(01) — Şərq Soft</span>
        <span class="hidden sm:block">Jey ERP · Bakı, AZ</span>
        <span class="flex items-center gap-2">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-400 opacity-75" />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-neon-400" />
          </span>
          {{ t('hero.badge') }}
        </span>
      </div>

      <!-- broken-grid headline -->
      <h1 class="font-display font-extrabold leading-[0.88] tracking-tight">
        <span class="kin-1 block text-[clamp(1.85rem,8.2vw,7rem)] text-white">
          <SplitText :text="t('hero.titleA')" :delay="0.75" :stagger="0.03" />
        </span>
        <span class="kin-2 block pl-[8vw] text-[clamp(1.85rem,8.2vw,7rem)] sm:pl-[22vw]">
          <SplitText :text="t('hero.titleB')" :delay="1" :stagger="0.03" char-class="text-neon-gradient" />
        </span>
        <span class="kin-3 block text-[clamp(1.85rem,8.2vw,7rem)] text-white">
          <SplitText :text="t('hero.titleC')" :delay="1.25" :stagger="0.03" />
        </span>
      </h1>

      <!-- offset bottom row: subtitle + CTAs + side meta -->
      <div class="mt-14 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <p class="hero-fade max-w-md justify-self-start text-base leading-relaxed text-white/55 md:ml-[22vw]">
          {{ t('hero.subtitle') }}
        </p>

        <div class="hero-fade flex flex-wrap items-center gap-4">
          <button v-magnetic="0.5" class="btn-neon text-base" @click="scrollTo('contact')">
            {{ t('hero.ctaPrimary') }}
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button class="btn-ghost text-base" @click="scrollTo('services')">
            {{ t('hero.ctaSecondary') }}
          </button>
        </div>
      </div>
    </div>

    <!-- scroll cue -->
    <div class="hero-fade absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40">
      <span class="font-mono text-[10px] uppercase tracking-[0.3em]">{{ t('hero.scroll') }}</span>
      <div class="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
        <span class="h-2 w-1 animate-bounce rounded-full bg-neon-300" />
      </div>
    </div>

    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
  </section>
</template>
