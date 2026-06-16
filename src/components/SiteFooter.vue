<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const year = new Date().getFullYear()

const links = [
  { id: 'about', key: 'nav.about' },
  { id: 'services', key: 'nav.services' },
  { id: 'process', key: 'nav.process' },
  { id: 'clients', key: 'nav.clients' },
  { id: 'faq', key: 'nav.faq' },
]
function go(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative border-t border-white/[0.07] py-14">
    <div class="container-x">
      <div class="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div class="flex items-center gap-2.5">
            <span
              class="grid h-8 w-8 place-items-center rounded-lg bg-neon-500/15 ring-1 ring-neon-400/40"
            >
              <svg viewBox="0 0 24 24" class="h-4 w-4 text-neon-300" fill="none">
                <circle cx="5" cy="6" r="2" fill="currentColor" />
                <circle cx="19" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2.4" fill="#22d3ee" />
                <path
                  d="M5 6 12 18 19 6"
                  stroke="currentColor"
                  stroke-width="1.2"
                  opacity="0.6"
                />
              </svg>
            </span>
            <span class="text-lg font-semibold tracking-tight text-white">
              Şərq<span class="text-neon-400">Soft</span>
            </span>
          </div>
          <p class="mt-4 max-w-xs text-sm text-white/40">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <div>
          <div
            class="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40"
          >
            {{ t('footer.nav') }}
          </div>
          <ul class="space-y-2.5">
            <li v-for="l in links" :key="l.id">
              <button
                data-cursor
                class="text-sm text-white/55 transition-colors hover:text-neon-300"
                @click="go(l.id)"
              >
                {{ t(l.key) }}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <div
            class="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40"
          >
            {{ t('footer.contactCol') }}
          </div>
          <ul class="space-y-2.5 text-sm text-white/55">
            <li>info@sherqsoft.az</li>
            <li>+994 (00) 000-00-00</li>
            <li>Bakı, Azərbaycan</li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-white/35 sm:flex-row"
      >
        <span>© {{ year }} Şərq Soft. {{ t('footer.rights') }}</span>
        <span>Jey ERP · Powered by Jey Soft</span>
      </div>
    </div>
  </footer>
</template>
