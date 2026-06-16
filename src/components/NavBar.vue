<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitch from './LanguageSwitch.vue'

const { t } = useI18n()
const scrolled = ref(false)
const open = ref(false)

const links = [
  { id: 'about', key: 'nav.about' },
  { id: 'services', key: 'nav.services' },
  { id: 'process', key: 'nav.process' },
  { id: 'clients', key: 'nav.clients' },
  { id: 'faq', key: 'nav.faq' },
]

function onScroll() {
  scrolled.value = window.scrollY > 40
}
function go(id) {
  open.value = false
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-[900] transition-all duration-500"
    :class="
      scrolled
        ? 'border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-xl'
        : 'bg-transparent'
    "
  >
    <nav class="container-x flex h-16 items-center justify-between md:h-20">
      <!-- logo (placeholder slot for client logo file) -->
      <a
        href="#top"
        data-cursor
        class="flex items-center gap-2.5"
        @click.prevent="go('top')"
      >
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
        <span class="text-[15px] font-semibold tracking-tight text-white">
          Şərq<span class="text-neon-400">Soft</span>
        </span>
      </a>

      <!-- desktop links -->
      <ul class="hidden items-center gap-7 md:flex">
        <li v-for="l in links" :key="l.id">
          <button
            data-cursor
            class="text-sm text-white/60 transition-colors hover:text-white"
            @click="go(l.id)"
          >
            {{ t(l.key) }}
          </button>
        </li>
      </ul>

      <div class="flex items-center gap-3">
        <LanguageSwitch />
        <button
          v-magnetic="0.3"
          class="btn-neon hidden md:inline-flex !px-5 !py-2.5"
          @click="go('contact')"
        >
          {{ t('nav.cta') }}
        </button>
        <!-- mobile toggle -->
        <button
          class="grid h-10 w-10 place-items-center rounded-lg border border-white/10 md:hidden"
          aria-label="Menu"
          @click="open = !open"
        >
          <div class="space-y-1.5">
            <span
              class="block h-px w-5 bg-white transition-transform"
              :class="open ? 'translate-y-[6px] rotate-45' : ''"
            />
            <span
              class="block h-px w-5 bg-white transition-opacity"
              :class="open ? 'opacity-0' : ''"
            />
            <span
              class="block h-px w-5 bg-white transition-transform"
              :class="open ? '-translate-y-[6px] -rotate-45' : ''"
            />
          </div>
        </button>
      </div>
    </nav>

    <!-- mobile menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="open"
        class="border-t border-white/[0.06] bg-ink-950/95 px-6 py-5 backdrop-blur-xl md:hidden"
      >
        <ul class="flex flex-col gap-1">
          <li v-for="l in links" :key="l.id">
            <button
              class="w-full rounded-lg px-3 py-3 text-left text-base text-white/80 hover:bg-white/5"
              @click="go(l.id)"
            >
              {{ t(l.key) }}
            </button>
          </li>
          <li>
            <button class="btn-neon mt-2 w-full" @click="go('contact')">
              {{ t('nav.cta') }}
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>
