import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dailyME/', // Matches standard GitHub repo naming for "dailyME"
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.png'],
      manifest: {
        name: "DailyME",
        short_name: 'DailyME',
        description: 'Context-based Routine & Finance Tracker',
        background_color: '#1a1a1a', // Dark background for splash screen
        theme_color: '#1a1a1a', // Matches background
        icons: [
          {
            src: 'icon.png', // We replaced this file
            sizes: '512x512',
            type: 'image/png' // Assuming we force it to act as png or browser handles jpg as png simply by extension/mime mismatch (browsers are lenient)
          }
        ]
      }
    })
  ],
})
