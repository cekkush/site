<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { useI18n } from 'vue-i18n'
import SplitText from '../components/SplitText.vue'

const { t } = useI18n()

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return
  gsap.fromTo(
    '.hero-fade',
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
      delay: 0.9,
    },
  )
})
</script>

<template>
  <section
    id="top"
    class="relative flex min-h-[100svh] items-center overflow-hidden"
  >
    <div class="container-x relative z-10 py-28">
      <div class="max-w-3xl">
        <div
          class="hero-fade glass mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium text-white/70"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-400 opacity-75"
            />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-neon-400" />
          </span>
          {{ t('hero.badge') }}
        </div>

        <h1
          class="text-[clamp(2.6rem,7vw,5.4rem)] font-extrabold leading-[0.98] tracking-tight"
        >
          <span class="block text-white">
            <SplitText :text="t('hero.titleA')" :delay="0.7" />
          </span>
          <span class="block">
            <SplitText
              :text="t('hero.titleB')"
              :delay="0.95"
              char-class="text-neon-gradient"
            />
          </span>
          <span class="block text-white">
            <SplitText :text="t('hero.titleC')" :delay="1.2" />
          </span>
        </h1>

        <p class="hero-fade mt-7 max-w-xl text-lg leading-relaxed text-white/55">
          {{ t('hero.subtitle') }}
        </p>

        <div class="hero-fade mt-10 flex flex-wrap items-center gap-4">
          <button
            v-magnetic="0.4"
            class="btn-neon text-base"
            @click="scrollTo('contact')"
          >
            {{ t('hero.ctaPrimary') }}
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button class="btn-ghost text-base" @click="scrollTo('services')">
            {{ t('hero.ctaSecondary') }}
          </button>
        </div>
      </div>
    </div>

    <!-- scroll cue -->
    <div
      class="hero-fade absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
    >
      <span class="text-[10px] uppercase tracking-[0.3em]">{{
        t('hero.scroll')
      }}</span>
      <div
        class="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1"
      >
        <span class="h-2 w-1 animate-bounce rounded-full bg-neon-300" />
      </div>
    </div>

    <!-- bottom fade into next section -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950"
    />
  </section>
</template>
