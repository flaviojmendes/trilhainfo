import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { catalogPlugin } from './scripts/catalogPlugin';
import { socialPlugin } from './scripts/socialPlugin';
import { apiDevPlugin } from './scripts/apiDevPlugin';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: process.env.TRILHA_ENV_DIR,
  plugins: [react(), catalogPlugin(), socialPlugin(), apiDevPlugin()],
  // Only reached through the lazy developer mode panel, so the dev server would find them too late.
  optimizeDeps: {
    include: [
      'react-syntax-highlighter/dist/esm/prism-light',
      'react-syntax-highlighter/dist/esm/languages/prism/tsx',
      'react-syntax-highlighter/dist/esm/languages/prism/typescript',
      'react-syntax-highlighter/dist/esm/languages/prism/css',
      'react-syntax-highlighter/dist/esm/languages/prism/json',
    ],
  },
});
