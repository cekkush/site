<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import gsap from 'gsap'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const root = ref(null)
const line = ref(null)
let ctx

const kpis = ref([
  { key: 'revenue', value: 0, target: 128400, delta: '+12.4%', up: true, accent: 'text-neon-300' },
  { key: 'expenses', value: 0, target: 47200, delta: '−3.1%', up: false, accent: 'text-white/80' },
  { key: 'profit', value: 0, target: 81200, delta: '+18.7%', up: true, accent: 'text-cyan-glow' },
])

const fmt = (n) => n.toLocaleString('az-Latn-AZ').replace(/,/g, ' ')

// area chart geometry
const pts = [28, 42, 36, 58, 50, 72, 64, 88, 78, 96]
const W = 520
const H = 150
const chartPath = computed(() => {
  const step = W / (pts.length - 1)
  const max = 110
  return pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${H - (p / max) * H}`)
    .join(' ')
})
const areaPath = computed(() => `${chartPath.value} L ${W} ${H} L 0 ${H} Z`)
const bars = [40, 55, 48, 70, 62, 85, 78, 92]

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    kpis.value.forEach((k) => (k.value = k.target))
    return
  }
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    kpis.value.forEach((k, i) => {
      const o = { v: 0 }
      tl.to(o, {
        v: k.target, duration: 1.4, ease: 'power2.out',
        onUpdate: () => (k.value = Math.round(o.v)),
      }, i * 0.12)
    })
    if (line.value) {
      const len = line.value.getTotalLength()
      gsap.set(line.value, { strokeDasharray: len, strokeDashoffset: len })
      tl.to(line.value, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.out' }, 0.3)
    }
    tl.from('.dash-bar', { scaleY: 0, transformOrigin: 'bottom', duration: 0.9, stagger: 0.05, ease: 'power3.out' }, 0.4)
    tl.from('.dash-area', { opacity: 0, duration: 1.2 }, 0.6)
    tl.from('.dash-row', { opacity: 0, x: 12, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, 0.7)
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <div
    ref="root"
    class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-ink-850 to-ink-950 shadow-2xl"
  >
    <!-- top bar -->
    <div class="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
      <div class="flex items-center gap-1.5">
        <span class="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span class="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span class="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <div class="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55">
        {{ t('dash.title') }}
      </div>
      <div class="flex items-center gap-1.5 text-xs text-white/45">
        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        {{ t('dash.live') }}
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-[180px_1fr]">
      <!-- sidebar -->
      <aside class="hidden border-r border-white/[0.07] p-3 sm:block">
        <div class="mb-4 flex items-center gap-2 px-2">
          <span class="grid h-6 w-6 place-items-center rounded bg-neon-500/20 text-[10px] font-bold text-neon-300">J</span>
          <span class="text-sm font-semibold text-white/80">Jey ERP</span>
        </div>
        <nav class="space-y-1">
          <div
            v-for="(item, i) in tm('dash.nav')"
            :key="i"
            class="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors"
            :class="i === 0 ? 'bg-neon-500/15 text-white' : 'text-white/45 hover:text-white/70'"
          >
            <span class="h-1.5 w-1.5 rounded-full" :class="i === 0 ? 'bg-neon-400' : 'bg-white/25'" />
            {{ item }}
          </div>
        </nav>
      </aside>

      <!-- main -->
      <div class="space-y-4 p-4">
        <!-- KPI cards -->
        <div class="grid grid-cols-3 gap-3">
          <div v-for="k in kpis" :key="k.key" class="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
            <div class="text-[11px] text-white/45">{{ t('dash.' + k.key) }}</div>
            <div class="mt-1 text-base font-semibold tabular-nums sm:text-lg" :class="k.accent">
              {{ fmt(k.value) }} <span class="text-xs text-white/30">₼</span>
            </div>
            <div class="mt-1 flex items-center gap-1 text-[11px]" :class="k.up ? 'text-emerald-400' : 'text-rose-400'">
              <span>{{ k.up ? '▲' : '▼' }}</span>{{ k.delta }}
            </div>
          </div>
        </div>

        <!-- chart -->
        <div class="rounded-lg border border-white/[0.07] bg-white/[0.02] p-4">
          <div class="mb-3 flex items-center justify-between">
            <span class="text-xs font-medium text-white/60">{{ t('dash.chartTitle') }}</span>
            <span class="text-[11px] text-white/30">2026</span>
          </div>
          <div class="relative">
            <!-- bars -->
            <div class="absolute inset-0 flex items-end justify-between gap-2 px-1 pb-px">
              <span
                v-for="(b, i) in bars" :key="i"
                class="dash-bar w-full rounded-sm bg-neon-500/15"
                :style="{ height: b + '%' }"
              />
            </div>
            <!-- line + area -->
            <svg :viewBox="`0 0 ${W} ${H}`" class="relative h-[120px] w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="dashFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#7c5cff" stop-opacity="0.35" />
                  <stop offset="100%" stop-color="#7c5cff" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path class="dash-area" :d="areaPath" fill="url(#dashFill)" />
              <path ref="line" :d="chartPath" fill="none" stroke="#8b6dff" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>

        <!-- recent activity -->
        <div class="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
          <div class="mb-2 px-1 text-xs font-medium text-white/60">{{ t('dash.recent') }}</div>
          <div class="space-y-1">
            <div
              v-for="(r, i) in tm('dash.rows')" :key="i"
              class="dash-row flex items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-white/[0.03]"
            >
              <span class="flex items-center gap-2 text-white/70">
                <span class="h-1.5 w-1.5 rounded-full" :class="r[1].startsWith('+') ? 'bg-emerald-400' : 'bg-rose-400'" />
                {{ r[0] }}
              </span>
              <span class="tabular-nums" :class="r[1].startsWith('+') ? 'text-emerald-400' : 'text-white/50'">{{ r[1] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
