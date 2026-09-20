module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './app/components/**/*.vue',
      './app/layouts/**/*.vue',
      './app/pages/**/*.vue',
      './app/plugins/**/*.js',
      './nuxt.config.js',
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        outline: '0 0 0 1px rgba(66, 153, 225, 0.5)',
      },
      colors: {
        'orange-button': '#e8752a',
        'green-button': '#168f79',
        'purple-hover': '#4c52f8',
        'purple-hover-stroke': '#8286ff',
        'purple-progress': '#3b41e3',
      },
      borderRadius: {
        20: '20px',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [],
}
