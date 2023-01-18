const prettierPluginTailwindcss = require('prettier-plugin-tailwindcss');

module.exports = {
  plugins: [prettierPluginTailwindcss],
  printWidth: 100,
  tabWidth: 2,
  arrowParens: 'always',
  singleQuote: true,
  trailingComma: 'all',
};
