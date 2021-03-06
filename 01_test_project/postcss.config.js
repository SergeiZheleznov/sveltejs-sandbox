module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.js'),
    require('cssnano')({
      preset: ['default', {
          discardComments: {
              removeAll: true,
          },
      }]
    }),
  ]
}