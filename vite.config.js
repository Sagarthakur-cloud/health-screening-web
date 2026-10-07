import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['models/*.tflite', 'wasm/*'],
      manifest: {
        name: 'Dr. Screen - Field Screening App',
        short_name: 'Dr. Screen',
        theme_color: '#2563eb',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
  maximumFileSizeToCacheInBytes: 30 * 1024 * 1024,
  globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
  runtimeCaching: [
    {
      urlPattern: /\.tflite$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'ai-models',
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: /\.wasm$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'wasm-runtime',
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
  ],
}
    }),
  ],
});