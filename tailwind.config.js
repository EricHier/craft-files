module.exports = {
  purge: [
    './src/**/*.vue',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        'fit': "fit-content"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}