import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3030,
    },
    resolve: {
        alias: {
            '@': '/src',
            '@styles': '/src/styles',
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
