import { defineConfig } from 'vitest/config';

export default defineConfig({
  envDir: process.env.TRILHA_ENV_DIR,
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts',
  },
});
