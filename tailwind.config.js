/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
      current: 'currentColor',
      gray: {
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
      },
      dark: {
        primary: '#0F1419',
        secondary: '#1A2B42',
        tertiary: '#2A3F5F',
      },
      blue: {
        600: '#0284C7',
        700: '#0369A1',
      },
      red: {
        400: '#EF4444',
        700: '#B91C1C',
      },
      green: {
        500: '#22C55E',
        700: '#15803D',
      },
      yellow: {
        400: '#FBBF24',
        500: '#F59E0B',
      },
    },
    extend: {
      backgroundColor: {
        'dark-primary': '#0F1419',
        'dark-secondary': '#1A2B42',
        'dark-tertiary': '#2A3F5F',
      },
      textColor: {
        'dark-primary': '#0F1419',
        'dark-secondary': '#1A2B42',
        'dark-tertiary': '#2A3F5F',
      },
      borderColor: {
        'dark-primary': '#0F1419',
        'dark-secondary': '#1A2B42',
        'dark-tertiary': '#2A3F5F',
      },
    },
  },
  plugins: [],
}
