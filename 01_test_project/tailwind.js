module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      "./src/**/*.svelte",
      "./public/**/*.html"
    ]
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
