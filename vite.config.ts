import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default mergeConfig(
  defineConfig({
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          main: 'index.refactoring.html',
        },
      },
    },
    preview: {
      open: '/index.refactoring.html',
    },
  }),
  defineTestConfig({
    base: 'front_5th_chapter2-2',
    build: {
      outDir: 'docs',
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  }),
);
