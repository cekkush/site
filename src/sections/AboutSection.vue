<script setup>
import { useI18n } from 'vue-i18n'
const { t, tm } = useI18n()
</script>

<template>
  <section id="about" class="relative py-28 md:py-36">
    <div class="container-x">
      <div class="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <!-- left: heading -->
        <div v-reveal.left>
          <span class="kicker">{{ t('about.kicker') }}</span>
          <h2
            class="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.05] tracking-tight text-gradient"
          >
            {{ t('about.title') }}
          </h2>
          <p class="mt-6 text-lg leading-relaxed text-white/60">
            {{ t('about.lead') }}
          </p>
        </div>

        <!-- right: body + pillars -->
        <div>
          <div v-reveal.right class="space-y-5 text-white/55">
            <p class="leading-relaxed">{{ t('about.p1') }}</p>
            <p class="leading-relaxed">{{ t('about.p2') }}</p>
          </div>

          <div
            v-reveal
            data-reveal-children=".pillar"
            class="mt-10 grid gap-4 sm:grid-cols-3"
          >
            <div
              v-for="(p, i) in tm('about.pillars')"
              :key="i"
              class="pillar glass glass-hover group p-5"
            >
              <div
                class="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-neon-500/15 text-neon-300 ring-1 ring-neon-400/30"
              >
                <span class="font-mono text-sm">0{{ i + 1 }}</span>
              </div>
              <div class="text-sm font-semibold text-white">{{ p.t }}</div>
              <div class="mt-1.5 text-sm leading-relaxed text-white/45">
                {{ p.d }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
