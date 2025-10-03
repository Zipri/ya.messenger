import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsconfigPaths(), //плагин для поддержки работы алиасов TS (@components и пр, см. tsconfig.paths.json)
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@styles': '/src/ui/styles',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ['color-functions'],
      },
    },
  },
});
