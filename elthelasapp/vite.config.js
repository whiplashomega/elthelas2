import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080,
    host: "0.0.0.0",
    proxy: {
      '/users/*': { target: 'http://0.0.0.0:8081' },
      '/users': { target: 'http://0.0.0.0:8081' },
      '/characters': { target: 'http://0.0.0.0:8081' },
      '/characters/*': { target: 'http://0.0.0.0:8081' },
      '/encounters': { target: 'http://0.0.0.0:8081' },
      '/campaigns/*': { target: 'http://0.0.0.0:8081' },
      '/campaigns': { target: 'http://0.0.0.0:8081' },
      '/creatures/*': { target: 'http://0.0.0.0:8081' },
      '/creatures': { target: 'http://0.0.0.0:8081' },
      '/strongholds/*': { target: 'http://0.0.0.0:8081' },
      '/strongholds': { target: 'http://0.0.0.0:8081' }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
})
