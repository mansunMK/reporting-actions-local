// @ts-check
import { defineConfig } from 'vite';
import path from 'path';

module.exports = defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            //! Change This
            name: 'TemplateActions',
            formats: ['es'],
        },
        rollupOptions: {
            input: {
                ActionsProvider: path.resolve(
                    __dirname,
                    'src/ActionsProvider.ts'
                ),
                //! Add Consequences Entry Points here. Each consequence should have a different entry
                // Uncomment below lines if you want to test
                // DummyConsequence: path.resolve(
                //     __dirname,
                //     'src/consequences/DummyConsequence.ts'
                // ),
            },
            output: {
                entryFileNames: () => '[name].[format].js',
                // Since we publish our ./src folder, there's no point
                // in bloating sourcemaps with another copy of it.
                sourcemapExcludeSources: true,
            },
        },
        sourcemap: true,
        // Reduce bloat from legacy polyfills.
        target: 'esnext',
        // Leave minification up to applications.
        minify: false,
    },
});
