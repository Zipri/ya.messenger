import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3030,
    },
    css: {
        postcss: './postcss.config.js',
    },
});
