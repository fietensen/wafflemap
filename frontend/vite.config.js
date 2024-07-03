import { defineConfig } from 'vite'
import stylin from '@stylin/vite-plugin'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [stylin(), react()],
})
