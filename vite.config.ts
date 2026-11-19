import { defineConfig } from 'vite'
import solid from '@solidjs/vite-plugin'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [tailwindcss(), solid()],
})

export default config
