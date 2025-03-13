import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@components': '/src/components',
      '@helpers': '/src/helpers',
      '@assets': '/src/assets',
      '@styles': '/src/styles',
      "@features": "/src/features",
      "@widgets": "/src/widgets",
      "@pages": "/src/pages",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://bitrix-api.mantera.digital",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
