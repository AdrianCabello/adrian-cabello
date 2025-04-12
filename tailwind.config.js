/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 15s ease-in-out infinite',
        'float-delayed-1': 'float 15s ease-in-out 2s infinite',
        'float-delayed-2': 'float 15s ease-in-out 4s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
} 