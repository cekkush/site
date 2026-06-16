<script setup>
import { useI18n } from 'vue-i18n'
const { t, tm } = useI18n()

// Placeholder client wordmarks — replace with real client logos later.
const clients = ['NOVA', 'ATLAS', 'MERIDIAN', 'CASPIAN', 'VERTEX', 'ORBITA']
</script>

<template>
  <section id="clients" class="relative py-28 md:py-36">
    <div class="container-x">
      <div class="mx-auto max-w-2xl text-center" v-reveal>
        <span class="kicker justify-center">{{ t('clients.kicker') }}</span>
        <h2
          class="mt-5 text-[clamp(2rem,4.5vw,3.4rem)] font-bold tracking-tight text-gradient"
        >
          {{ t('clients.title') }}
        </h2>
      </div>

      <div
        v-reveal
        data-reveal-children=".quote"
        class="mt-16 grid gap-5 md:grid-cols-3"
      >
        <figure
          v-for="(c, i) in tm('clients.items')"
          :key="i"
          class="quote glass glass-hover flex flex-col p-7"
        >
          <svg
            viewBox="0 0 24 24"
            class="mb-5 h-8 w-8 text-neon-500/50"
            fill="currentColor"
          >
            <path
              d="M9 7H5a2 2 0 00-2 2v4a2 2 0 002 2h2v4l4-4V9a2 2 0 00-2-2zm10 0h-4a2 2 0 00-2 2v4a2 2 0 002 2h2v4l4-4V9a2 2 0 00-2-2z"
            />
          </svg>
          <blockquote class="flex-1 text-[15px] leading-relaxed text-white/70">
            “{{ c.q }}”
          </blockquote>
          <figcaption class="mt-6 flex items-center gap-3">
            <div
              class="grid h-10 w-10 place-items-center rounded-full bg-neon-500/15 text-sm font-semibold text-neon-300 ring-1 ring-neon-400/30"
            >
              {{ c.a.charAt(0) }}
            </div>
            <div>
              <div class="text-sm font-semibold text-white">{{ c.a }}</div>
              <div class="text-xs text-white/40">{{ c.c }}</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>

    <!-- logo marquee -->
    <div class="relative mt-20 overflow-hidden py-6">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-950 to-transparent"
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-950 to-transparent"
      />
      <div class="marquee flex w-max gap-16">
        <span
          v-for="(name, i) in [...clients, ...clients]"
          :key="i"
          class="select-none text-2xl font-bold tracking-tight text-white/15 transition-colors hover:text-white/40"
        >
          {{ name }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  animation: scroll-x 28s linear infinite;
}
@keyframes scroll-x {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .marquee {
    animation: none;
  }
}
</style>
