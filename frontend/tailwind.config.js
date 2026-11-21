/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#F2FAF7',
          100: '#E4F5EE',
          200: '#C7EBD9',
          300: '#9AD9BE',
          400: '#6BC49A',
          500: '#3DAB7A',
          600: '#2E8F64',
          700: '#257352',
        },
        sky: {
          soft: '#E8F1F8',
          mid: '#B7D0E5',
          deep: '#6B9AC4',
        },
        lavender: {
          soft: '#F0EBF5',
          mid: '#D4C6E4',
        },
        navy: {
          DEFAULT: '#1B2A4A',
          muted: '#3D4F6F',
          soft: '#5A6B88',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(27, 42, 74, 0.08)',
        card: '0 4px 20px rgba(27, 42, 74, 0.06)',
        glow: '0 0 40px rgba(61, 171, 122, 0.18)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(183, 208, 229, 0.45), transparent), radial-gradient(ellipse 60% 50% at 20% 60%, rgba(157, 217, 190, 0.35), transparent), linear-gradient(165deg, #F2FAF7 0%, #E8F1F8 45%, #F0EBF5 100%)',
      },
    },
  },
  plugins: [],
};
