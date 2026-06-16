<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  text: { type: String, required: true },
  // 'mount' animates immediately, 'scroll' on scroll into view
  trigger: { type: String, default: 'mount' },
  delay: { type: Number, default: 0 },
  stagger: { type: Number, default: 0.022 },
  as: { type: String, default: 'span' },
  // class applied to each character span (e.g. a gradient clip class).
  charClass: { type: String, default: '' },
})

const root = ref(null)
let st = null
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function play() {
  if (!root.value) return
  const chars = root.value.querySelectorAll('.st-char')
  if (reduced) {
    gsap.set(chars, { opacity: 1, y: 0, rotateX: 0 })
    return
  }
  gsap.fromTo(
    chars,
    { opacity: 0, yPercent: 120, rotateX: -90 },
    {
      opacity: 1,
      yPercent: 0,
      rotateX: 0,
      duration: 0.9,
      ease: 'power4.out',
      stagger: props.stagger,
      delay: props.delay,
    },
  )
}

function setup() {
  st?.kill()
  st = null
  nextTick(() => {
    if (props.trigger === 'scroll') {
      st = ScrollTrigger.create({
        trigger: root.value,
        start: 'top 85%',
        once: true,
        onEnter: play,
      })
    } else {
      play()
    }
  })
}

onMounted(setup)
watch(() => props.text, setup)
onBeforeUnmount(() => st?.kill())
</script>

<template>
  <component :is="as" ref="root" class="st-wrap" aria-label="text">
    <span
      v-for="(word, wi) in text.split(' ')"
      :key="wi"
      class="st-word"
    >
      <span
        v-for="(ch, ci) in word.split('')"
        :key="ci"
        class="st-char"
        :class="charClass"
        >{{ ch }}</span
      ><span v-if="wi < text.split(' ').length - 1" class="st-space">&nbsp;</span>
    </span>
  </component>
</template>

<style scoped>
.st-wrap {
  display: inline-block;
  perspective: 600px;
}
.st-word {
  display: inline-flex;
  white-space: nowrap;
}
.st-char {
  display: inline-block;
  transform-origin: 50% 100%;
  will-change: transform, opacity;
}
.st-space {
  display: inline-block;
}
</style>
