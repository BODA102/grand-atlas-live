import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    allowedHosts: ['surgical-critics-news-gene.trycloudflare.com'],
    proxy: {
      '/api': {
        target: 'https://white-seahorse-266682.hostingersite.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
