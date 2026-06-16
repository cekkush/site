<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button, FormControl } from 'frappe-ui'

const { t } = useI18n()
const sent = ref(false)
const form = reactive({ name: '', company: '', email: '', message: '' })

function submit() {
  // No backend (static site): we acknowledge locally.
  // Wire this to an email/API endpoint when contact details are provided.
  sent.value = true
}

// Placeholder contact details — to be replaced with real ones.
const contacts = [
  { key: 'phoneLabel', value: '+994 (00) 000-00-00', href: 'tel:+994000000000' },
  { key: 'emailLabel', value: 'info@sherqsoft.az', href: 'mailto:info@sherqsoft.az' },
  { key: 'addressLabel', value: 'Bakı, Azərbaycan', href: null },
]
</script>

<template>
  <section id="contact" class="relative py-28 md:py-36">
    <div class="container-x">
      <div
        class="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-ink-850 to-ink-950 p-8 md:p-14"
      >
        <!-- ambient glow -->
        <div
          class="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-neon-500/20 blur-[100px]"
        />
        <div
          class="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-cyan-glow/10 blur-[100px]"
        />

        <div class="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
          <!-- left: copy + contacts -->
          <div v-reveal.left>
            <span class="kicker">{{ t('contact.kicker') }}</span>
            <h2
              class="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.05] tracking-tight text-gradient"
            >
              {{ t('contact.title') }}
            </h2>
            <p class="mt-5 max-w-md text-lg text-white/55">
              {{ t('contact.lead') }}
            </p>

            <div class="mt-10 space-y-4">
              <a
                v-for="c in contacts"
                :key="c.key"
                :href="c.href || undefined"
                data-cursor
                class="group flex items-center gap-4"
              >
                <span
                  class="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.04] text-neon-300 ring-1 ring-white/10 transition-colors group-hover:ring-neon-400/40"
                >
                  <span class="h-2 w-2 rounded-full bg-neon-400" />
                </span>
                <span>
                  <span class="block text-xs uppercase tracking-wide text-white/40">{{
                    t('contact.' + c.key)
                  }}</span>
                  <span class="text-[15px] text-white/80">{{ c.value }}</span>
                </span>
              </a>
            </div>
            <p class="mt-6 text-xs italic text-white/30">
              {{ t('contact.placeholderNote') }}
            </p>
          </div>

          <!-- right: Frappe UI form -->
          <div v-reveal.right>
            <transition
              mode="out-in"
              enter-active-class="transition duration-500 ease-out"
              enter-from-class="opacity-0 translate-y-3"
            >
              <div
                v-if="sent"
                key="ok"
                class="glass flex h-full min-h-[340px] flex-col items-center justify-center p-10 text-center"
              >
                <div
                  class="mb-5 grid h-16 w-16 place-items-center rounded-full bg-neon-500/15 ring-1 ring-neon-400/40"
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="h-7 w-7 text-neon-300"
                    fill="none"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      stroke-width="2.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <p class="text-lg font-semibold text-white">
                  {{ form.name || 'OK' }} 👋
                </p>
                <p class="mt-2 text-sm text-white/50">
                  {{ t('contact.lead') }}
                </p>
              </div>

              <form
                v-else
                key="form"
                class="glass space-y-4 p-7"
                @submit.prevent="submit"
              >
                <div class="grid gap-4 sm:grid-cols-2">
                  <FormControl
                    v-model="form.name"
                    type="text"
                    :placeholder="t('contact.namePlaceholder')"
                    size="lg"
                    required
                  />
                  <FormControl
                    v-model="form.company"
                    type="text"
                    :placeholder="t('contact.companyPlaceholder')"
                    size="lg"
                  />
                </div>
                <FormControl
                  v-model="form.email"
                  type="email"
                  :placeholder="t('contact.emailPlaceholder')"
                  size="lg"
                  required
                />
                <FormControl
                  v-model="form.message"
                  type="textarea"
                  :rows="4"
                  :placeholder="t('contact.messagePlaceholder')"
                  size="lg"
                />
                <Button
                  variant="solid"
                  size="lg"
                  class="!h-12 w-full !bg-neon-500 !text-white hover:!bg-neon-600"
                  type="submit"
                >
                  {{ t('contact.submit') }}
                </Button>
              </form>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
