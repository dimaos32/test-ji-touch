export default {
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html',
      },
    },
    {
      files: ['**/*.scss'],
      options: {
        singleQuote: false,
      },
    },
  ],
  singleQuote: true,
  quoteProps: 'consistent',
  semi: false,
  trailingComma: 'none',
  jsxSingleQuote: false,
  bracketSpacing: true,
  arrowParens: 'always',
  singleAttributePerLine: false,
  bracketSameLine: false,
  printWidth: 80,
};
