import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteYaml(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // GitHub Pages deployment: set base to your repo name
  // If deploying to https://<username>.github.io/<repo>/
  // Change this to match your repository name
  base: '/gis-knowledge-map/',
})
