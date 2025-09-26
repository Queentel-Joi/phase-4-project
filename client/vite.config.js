import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward frontend requests starting with /api to Flask backend
      '/api': {
        target: 'http://127.0.0.1:5000', // Flask server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
