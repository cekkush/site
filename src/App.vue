<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LivingDataField from './three/LivingDataField.js'

import Preloader from './components/Preloader.vue'
import CustomCursor from './components/CustomCursor.vue'
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

const ready = ref(false)
const canvas = ref(null)
const progress = ref(0)
let field = null

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  const p = max > 0 ? window.scrollY / max : 0
  progress.value = p
  field?.setScroll(p)
}

function onDone() {
  ready.value = true
  nextTick(() => {
    ScrollTrigger.refresh()
  })
}

onMounted(() => {
  if (canvas.value) {
    try {
      field = new LivingDataField(canvas.value)
    } catch (e) {
      // WebGL may be unavailable — fail gracefully, site still works.
      console.warn('LivingDataField disabled:', e)
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  // Refresh triggers after layout settles (fonts, images).
  window.addEventListener('load', () => ScrollTrigger.refresh())
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  field?.destroy()
})
</script>

<template>
  <Preloader v-if="!ready" @done="onDone" />
  <CustomCursor />

  <!-- scroll progress bar -->
  <div
    class="fixed left-0 top-0 z-[950] h-0.5 origin-left bg-gradient-to-r from-neon-400 to-cyan-glow"
    :style="{ transform: `scaleX(${progress})`, width: '100%' }"
  />

  <!-- 3D Living Data background -->
  <canvas
    ref="canvas"
    class="fixed inset-0 z-0 h-full w-full"
    aria-hidden="true"
  />
  <!-- vignette + readability overlay -->
  <div
    class="pointer-events-none fixed inset-0 z-0"
    style="
      background:
        radial-gradient(120% 90% at 50% 0%, transparent 40%, rgba(5, 6, 13, 0.55) 100%),
        radial-gradient(60% 50% at 50% 50%, rgba(124, 92, 255, 0.06), transparent 70%);
    "
  />

  <div class="relative z-10">
    <NavBar />
    <main>
      <HeroSection />
      <!-- post-hero content: slightly translucent so the network glows faintly behind -->
      <div class="relative bg-ink-950/92">
        <div class="pointer-events-none absolute inset-0 bg-dotgrid opacity-[0.5]" />
        <div class="relative">
          <AboutSection />
          <StatsSection />
          <ServicesSection />
          <ProcessSection />
          <TestimonialsSection />
          <FaqSection />
          <ContactSection />
          <SiteFooter />
        </div>
      </div>
    </main>
  </div>
</template>
