<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, tm } = useI18n()
const open = ref(0)

function toggle(i) {
  open.value = open.value === i ? -1 : i
}
</script>

<template>
  <section id="faq" class="relative py-28 md:py-36">
    <div class="container-x">
      <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div v-reveal.left>
          <span class="kicker">{{ t('faq.kicker') }}</span>
          <h2
            class="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight tracking-tight text-gradient"
          >
            {{ t('faq.title') }}
          </h2>
        </div>

        <div v-reveal.right class="divide-y divide-white/[0.07]">
          <div
            v-for="(f, i) in tm('faq.items')"
            :key="i"
            class="py-2"
          >
            <button
              data-cursor
              class="group flex w-full items-center justify-between gap-4 py-5 text-left"
              @click="toggle(i)"
            >
              <span
                class="text-lg font-medium transition-colors"
                :class="open === i ? 'text-white' : 'text-white/75 group-hover:text-white'"
              >
                {{ f.q }}
              </span>
              <span
                class="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border transition-all duration-300"
                :class="
                  open === i
                    ? 'rotate-45 border-neon-400/50 bg-neon-500/15 text-neon-300'
                    : 'border-white/15 text-white/50'
                "
              >
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
            </button>

            <div
              class="grid transition-all duration-500 ease-out"
              :class="
                open === i
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              "
            >
              <div class="overflow-hidden">
                <p class="pb-5 pr-12 text-[15px] leading-relaxed text-white/50">
                  {{ f.a }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
