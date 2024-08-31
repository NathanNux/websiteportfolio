const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    // Add other directories where you use Tailwind CSS or SCSS
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  safelist: ['html', 'body'], // Adjust the safelist as needed
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};