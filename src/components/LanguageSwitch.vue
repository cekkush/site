<script setup>
import { useI18n } from 'vue-i18n'
import { setLocale } from '../i18n'

const { locale } = useI18n()
const langs = ['az', 'en']

function choose(l) {
  if (l !== locale.value) setLocale(l)
}
</script>

<template>
  <div
    class="relative flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-xs font-semibold"
  >
    <button
      v-for="l in langs"
      :key="l"
      data-cursor
      class="relative z-10 rounded-full px-3 py-1.5 uppercase tracking-wider transition-colors duration-300"
      :class="locale === l ? 'text-white' : 'text-white/45 hover:text-white/80'"
      @click="choose(l)"
    >
      <span
        v-if="locale === l"
        class="absolute inset-0 -z-10 rounded-full bg-neon-500/90 shadow-glow"
      />
      {{ l }}
    </button>
  </div>
</template>
