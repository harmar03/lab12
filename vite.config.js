import { defineConfig } from 'vite';

export default defineConfig({
  root: '/',
  publicDir: 'public',
  plugins: [],
  server: { port: 1234 },
  build: {
    outDir: 'dist',
  },
});
