<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { useI18n } from 'vue-i18n'
import JeyDashboard from '../components/JeyDashboard.vue'

const { t } = useI18n()
const root = ref(null)
let ctx

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return
  ctx = gsap.context(() => {
    gsap.from('.hero-rise', {
      opacity: 0, y: 22, duration: 0.9, ease: 'power3.out', stagger: 0.1,
    })
    gsap.from('.hero-shot', {
      opacity: 0, y: 40, duration: 1.1, ease: 'power3.out', delay: 0.35,
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="top" ref="root" class="relative overflow-hidden pt-32 pb-20 sm:pt-40">
    <!-- soft ambient glow, Linear-style -->
    <div
      class="pointer-events-none absolute left-1/2 top-0 -z-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
      style="background: radial-gradient(closest-side, rgba(124,92,255,0.22), transparent)"
      aria-hidden="true"
    />

    <div class="container-x relative z-10">
      <div class="mx-auto max-w-3xl text-center">
        <div class="hero-rise mb-6 flex justify-center">
          <span class="kicker">{{ t('hero.badge') }}</span>
        </div>

        <h1
          class="hero-rise text-[clamp(2.2rem,6vw,4.4rem)] font-semibold leading-[1.05] tracking-tight text-white"
        >
          {{ t('hero.titleA') }}
          <span class="text-neon-gradient">{{ t('hero.titleB') }}</span>
          {{ t('hero.titleC') }}
        </h1>

        <p class="hero-rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/55">
          {{ t('hero.subtitle') }}
        </p>

        <div class="hero-rise mt-8 flex flex-wrap items-center justify-center gap-3">
          <button class="btn-neon text-sm" @click="scrollTo('contact')">
            {{ t('hero.ctaPrimary') }}
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button class="btn-ghost text-sm" @click="scrollTo('services')">
            {{ t('hero.ctaSecondary') }}
          </button>
        </div>
      </div>

      <!-- product dashboard -->
      <div class="hero-shot relative mx-auto mt-16 max-w-5xl">
        <div
          class="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-50 blur-2xl"
          style="background: radial-gradient(60% 60% at 50% 0%, rgba(124,92,255,0.25), transparent)"
          aria-hidden="true"
        />
        <JeyDashboard />
      </div>
    </div>
  </section>
</template>
