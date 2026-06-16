<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'

import HeroSection from './sections/HeroSection.vue'
import AboutSection from './sections/AboutSection.vue'
import StatsSection from './sections/StatsSection.vue'
import ServicesSection from './sections/ServicesSection.vue'
import ProcessSection from './sections/ProcessSection.vue'
import TestimonialsSection from './sections/TestimonialsSection.vue'
import FaqSection from './sections/FaqSection.vue'
import ContactSection from './sections/ContactSection.vue'

const progress = ref(0)

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? window.scrollY / max : 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  // recompute trigger positions once fonts/layout settle
  window.addEventListener('load', () => ScrollTrigger.refresh())
  setTimeout(() => ScrollTrigger.refresh(), 600)
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <!-- scroll progress -->
  <div
    class="fixed left-0 top-0 z-[950] h-0.5 w-full origin-left bg-gradient-to-r from-neon-400 to-cyan-glow"
    :style="{ transform: `scaleX(${progress})` }"
  />

  <!-- subtle global backdrop: deep base + hairline grid -->
  <div class="pointer-events-none fixed inset-0 -z-10 bg-ink-950" aria-hidden="true">
    <div class="absolute inset-0 bg-dotgrid opacity-40" />
    <div
      class="absolute inset-x-0 top-0 h-[500px]"
      style="background: radial-gradient(60% 100% at 50% 0%, rgba(124,92,255,0.10), transparent)"
    />
  </div>

  <NavBar />
  <main>
    <HeroSection />
    <AboutSection />
    <StatsSection />
    <ServicesSection />
    <ProcessSection />
    <TestimonialsSection />
    <FaqSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
