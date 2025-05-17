import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import fg from 'fast-glob';
import { resolve, relative, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const srcDir = resolve(rootDir, 'src');

function getHtmlEntries() {
  const files = fg.sync('**/*.html', { cwd: srcDir, absolute: true });
  const entries = {};

  for (const file of files) {
    const rel = relative(srcDir, file);
    const dir = dirname(rel);
    const name = basename(rel, '.html');

    const key = dir ? `${dir.split('/').join('-')}-${name}` : name;
    entries[key] = file;
  }

  return entries;
}

export default defineConfig({
  root: 'src',
  base: '',
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 5 },
      mozjpeg: { quality: 80, progressive: true },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'es2022',
    modulePreload: { polyfill: false },
    rollupOptions: {
      input: {
        ...getHtmlEntries(),
        styles: resolve(srcDir, 'styles/index.scss'),
        main: resolve(srcDir, 'scripts/index.js'),
      },
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        entryFileNames: 'assets/[name].[hash].js',
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      '@': srcDir,
      '@styles': resolve(srcDir, 'styles'),
      '@scripts': resolve(srcDir, 'scripts'),
    },
  },
  publicDir: resolve(rootDir, 'public'),
});
