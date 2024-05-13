/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import colors from 'tailwindcss/colors';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      bgprimary: '#FFFFFF',
      bgsecondary: '#0B0014',
      bgtertiary: '#BE12AA',
    },
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: false,
    darkTheme: 'light',
  },
};
