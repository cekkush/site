import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import frappeui from 'frappe-ui/vite'
import { fileURLToPath, URL } from 'node:url'

// Relative base so the build works on GitHub Pages project pages
// (served from /<repo>/) as well as any custom domain at the root.
export default defineConfig({
  base: './',
  plugins: [
    // Frappe UI plugin — we only need its lucide icon virtual modules.
    // The Frappe backend helpers (proxy, jinja boot data, build config) are
    // disabled since this is a standalone static site.
    frappeui({
      frappeProxy: false,
      jinjaBootData: false,
      buildConfig: false,
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap'],
        },
      },
    },
  },
})
