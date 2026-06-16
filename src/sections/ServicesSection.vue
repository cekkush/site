<script setup>
import { useI18n } from 'vue-i18n'
const { t, tm } = useI18n()

// Inline icon set keyed by index (accounting, inventory, sales, hr)
const icons = [
  'M4 7h16M4 12h16M4 17h10', // ledger lines
  'M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 17l9 4 9-4', // boxes
  'M3 17l5-5 4 3 7-8M14 7h5v5', // sales trend
  'M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0', // person
]

function spotlight(e) {
  const card = e.currentTarget
  const r = card.getBoundingClientRect()
  card.style.setProperty('--mx', `${e.clientX - r.left}px`)
  card.style.setProperty('--my', `${e.clientY - r.top}px`)
}
</script>

<template>
  <section id="services" class="relative py-28 md:py-36">
    <div class="container-x">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" v-reveal>
        <div class="max-w-xl">
          <span class="kicker">{{ t('services.kicker') }}</span>
          <h2
            class="mt-5 text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-tight text-gradient"
          >
            {{ t('services.title') }}
          </h2>
          <p class="mt-5 max-w-md text-lg text-white/55">{{ t('services.lead') }}</p>
        </div>
        <div class="font-display text-[clamp(4rem,12vw,9rem)] font-black leading-none text-white/[0.05]">
          02
        </div>
      </div>

      <div
        v-reveal
        data-reveal-children=".svc"
        class="mt-16 grid gap-5 md:grid-cols-2"
      >
        <article
          v-for="(s, i) in tm('services.items')"
          :key="i"
          class="svc group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 transition-colors duration-500 hover:border-neon-400/40"
          :class="i % 2 === 1 ? 'md:mt-20' : ''"
          @pointermove="spotlight"
        >
          <!-- spotlight glow -->
          <div
            class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style="
              background: radial-gradient(
                340px circle at var(--mx) var(--my),
                rgba(124, 92, 255, 0.14),
                transparent 60%
              );
            "
          />

          <div class="relative">
            <div
              class="mb-6 grid h-14 w-14 place-items-center rounded-xl bg-neon-500/10 ring-1 ring-neon-400/30 transition-transform duration-500 group-hover:scale-110"
            >
              <svg viewBox="0 0 24 24" class="h-6 w-6 text-neon-300" fill="none">
                <path
                  :d="icons[i]"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div class="mb-2 flex items-baseline gap-3">
              <span class="font-mono text-xs text-neon-400/70">0{{ i + 1 }}</span>
              <h3 class="text-xl font-semibold text-white">{{ s.t }}</h3>
            </div>
            <p class="text-sm leading-relaxed text-white/50">{{ s.d }}</p>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="(tag, ti) in s.tags"
                :key="ti"
                class="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
