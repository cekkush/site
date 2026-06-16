import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * v-reveal  — scroll-triggered reveal.
 * Modifiers:  v-reveal.up / .left / .right / .scale
 * Value:      stagger delay in seconds for children selector via `:stagger`
 *             or a number for delay. e.g. v-reveal="0.1"
 * Attribute   data-reveal-children=".selector" animates children with stagger.
 */
export const reveal = {
  mounted(el, binding) {
    if (reduced) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    const delay = typeof binding.value === 'number' ? binding.value : 0
    const childrenSel = el.dataset.revealChildren
    const targets = childrenSel ? el.querySelectorAll(childrenSel) : [el]

    let from = { opacity: 0, y: 40 }
    if (binding.modifiers.left) from = { opacity: 0, x: -50 }
    if (binding.modifiers.right) from = { opacity: 0, x: 50 }
    if (binding.modifiers.scale) from = { opacity: 0, scale: 0.9, y: 20 }
    if (binding.modifiers.up) from = { opacity: 0, y: 60 }

    gsap.set(targets, from)

    el._revealST = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.05,
          delay,
          ease: 'power3.out',
          stagger: childrenSel ? 0.09 : 0,
        })
      },
    })
  },
  unmounted(el) {
    el._revealST?.kill()
  },
}

/**
 * v-magnetic — element is gently attracted to the pointer.
 * Value: strength multiplier (default 0.35)
 */
export const magnetic = {
  mounted(el, binding) {
    if (reduced || !window.matchMedia('(hover: hover)').matches) return
    const strength = binding.value ?? 0.35
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    el._magMove = (e) => {
      const r = el.getBoundingClientRect()
      const mx = e.clientX - (r.left + r.width / 2)
      const my = e.clientY - (r.top + r.height / 2)
      xTo(mx * strength)
      yTo(my * strength)
    }
    el._magLeave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('pointermove', el._magMove)
    el.addEventListener('pointerleave', el._magLeave)
  },
  unmounted(el) {
    if (el._magMove) el.removeEventListener('pointermove', el._magMove)
    if (el._magLeave) el.removeEventListener('pointerleave', el._magLeave)
  },
}

export function registerDirectives(app) {
  app.directive('reveal', reveal)
  app.directive('magnetic', magnetic)
}
