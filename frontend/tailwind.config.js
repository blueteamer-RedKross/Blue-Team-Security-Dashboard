export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        page: '#0b1220',
        panel: '#131c2e',
        sidebar: '#0f1728',
        border: '#22304a',
        hover: '#18253b',
        accent: '#3a7bfd',
        accentSoft: '#2d4fe6',
        accentPurple: '#8b5cf6',
        accentOrange: '#f97316',
        accentGreen: '#22c55e',
      },
      boxShadow: {
        premium: '0 20px 60px rgba(15, 23, 40, 0.2)',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
