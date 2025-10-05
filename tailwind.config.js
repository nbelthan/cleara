/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#b3e5ff',
          200: '#80d4ff',
          300: '#4dc2ff',
          400: '#1ab1ff',
          500: '#00a0ff',
          600: '#0080cc',
          700: '#006099',
          800: '#004066',
          900: '#002033',
        },
        dark: {
          50: '#1a1f2e',
          100: '#151a26',
          200: '#0f1419',
          300: '#0a0e13',
          400: '#05080c',
          500: '#030507',
        },
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(100%) translateY(100%) rotate(45deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(100, 200, 255, 0.3)',
            borderColor: 'rgba(100, 200, 255, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(100, 200, 255, 0.6)',
            borderColor: 'rgba(100, 200, 255, 1)',
          },
        },
      },
    },
  },
  plugins: [],
}
