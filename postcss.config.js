module.exports = {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    ...(process.env.NODE_ENV === 'production'
      ? [
          [
            '@fullhuman/postcss-purgecss',
            {
              content: [
                './pages/**/*.{js,jsx,ts,tsx}',
                './components/**/*.{js,jsx,ts,tsx}',
                // Add other directories where you use Tailwind CSS or SCSS
              ],
              defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
              safelist: ['html', 'body'], // Adjust the safelist as needed
            },
          ],
        ]
      : []),
  ],
};
// this setup is for Next.js, but you can adjust it for other frameworks
// it will remove unused CSS in production thus making better ratings in Lighthouse