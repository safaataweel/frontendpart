import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173 // Default Vite port; can be any open port
  },
  build: {
    outDir: 'dist' // Ensure this matches your deployment settings
  }
});
