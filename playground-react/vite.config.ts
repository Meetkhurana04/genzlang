import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@yap': fileURLToPath(new URL('../src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    fs: {
      allow: [fileURLToPath(new URL('..', import.meta.url))],
    },
  },
})
