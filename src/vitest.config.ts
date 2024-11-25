import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        includeSource: ['src/**/*.{js,ts}'],
        globals: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
        },
    },
    define: {
        'import.meta.vitest': 'undefined',
    },
});
