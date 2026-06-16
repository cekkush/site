import { createApp } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App.vue'
import { i18n } from './i18n'
import { registerDirectives } from './directives'
import './style.css'

gsap.registerPlugin(ScrollTrigger)

const app = createApp(App)
app.use(i18n)
registerDirectives(app)
app.mount('#app')
