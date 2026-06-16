<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const root = ref(null)
const line = ref(null)
let st = null

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    if (line.value) line.value.style.transform = 'scaleY(1)'
    return
  }
  st = gsap.to(line.value, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: root.value,
      start: 'top 60%',
      end: 'bottom 75%',
      scrub: 0.6,
    },
  })
})
onBeforeUnmount(() => {
  st?.scrollTrigger?.kill()
  st?.kill()
})
</script>

<template>
  <section id="process" ref="root" class="relative py-28 md:py-36">
    <div class="container-x">
      <div class="mx-auto max-w-2xl text-center" v-reveal>
        <span class="kicker">{{ t('process.kicker') }}</span>
        <h2 class="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold tracking-tight text-gradient">
          {{ t('process.title') }}
        </h2>
        <p class="mt-4 text-lg text-white/55">{{ t('process.lead') }}</p>
      </div>

      <div class="relative mx-auto mt-16 max-w-3xl">
        <!-- spine -->
        <div
          class="absolute left-[27px] top-2 bottom-2 w-px bg-white/10 md:left-1/2"
        >
          <div
            ref="line"
            class="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-neon-400 via-neon-500 to-cyan-glow"
          />
        </div>

        <ul class="space-y-10">
          <li
            v-for="(s, i) in tm('process.steps')"
            :key="i"
            v-reveal
            class="relative flex items-start gap-6 md:gap-0"
            :class="i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
          >
            <!-- node -->
            <div
              class="relative z-10 grid h-14 w-14 flex-shrink-0 place-items-center rounded-full border border-neon-400/40 bg-ink-950 font-mono text-sm text-neon-300 shadow-glow md:absolute md:left-1/2 md:-translate-x-1/2"
            >
              {{ s.n }}
            </div>

            <!-- card -->
            <div
              class="glass glass-hover w-full p-6 md:w-[calc(50%-2.5rem)]"
              :class="i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'"
            >
              <h3 class="text-lg font-semibold text-white">{{ s.t }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-white/50">
                {{ s.d }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
