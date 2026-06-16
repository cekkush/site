<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const root = ref(null)
const displayed = ref([])
let st = null

onMounted(() => {
  const items = tm('stats.items')
  displayed.value = items.map(() => 0)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    displayed.value = items.map((i) => i.value)
    return
  }
  st = ScrollTrigger.create({
    trigger: root.value,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      items.forEach((item, i) => {
        const obj = { v: 0 }
        gsap.to(obj, {
          v: item.value,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            displayed.value[i] = Math.round(obj.v)
          },
        })
      })
    },
  })
})
onBeforeUnmount(() => st?.kill())
</script>

<template>
  <section ref="root" class="relative py-20">
    <div class="container-x">
      <div
        class="glass overflow-hidden rounded-3xl border-white/[0.06] bg-white/[0.02]"
      >
        <div class="grid grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(s, i) in tm('stats.items')"
            :key="i"
            class="group relative border-white/[0.06] p-8 text-center md:p-10"
            :class="[
              i % 2 === 0 ? 'border-r' : '',
              i < 2 ? 'border-b lg:border-b-0' : '',
              i === 1 ? 'lg:border-r' : '',
              i === 2 ? 'lg:border-r' : '',
            ]"
          >
            <div
              class="text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold tracking-tight text-neon-gradient tabular-nums"
            >
              {{ displayed[i] ?? 0 }}<span class="text-neon-400">{{
                s.suffix
              }}</span>
            </div>
            <div
              class="mt-2 text-sm font-medium uppercase tracking-wide text-white/45"
            >
              {{ s.label }}
            </div>
            <div
              class="absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-neon-400 to-transparent transition-transform duration-500 group-hover:scale-x-100"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
