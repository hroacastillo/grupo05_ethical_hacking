import { defineConfig } from 'vite'
import { createVuePlugin as vue } from 'vite-plugin-vue2'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: [
      {
        find: /^@\/(.+)/,
        replacement: path.resolve(__dirname, 'src') + '/$1'
      }
    ]
  }
})
