/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#0C1916',
          100: '#12231F',
          200: '#1C3730',
          300: '#3D745D',
          400: '#62C994',
          500: '#54D99A',
          600: '#3BC184',
          700: '#27A86F',
        },
        sky: {
          soft: '#101F22',
          mid: '#294448',
          deep: '#8FC2C5',
        },
        lavender: {
          soft: '#191C2A',
          mid: '#37344E',
        },
        navy: {
          DEFAULT: '#E9F4EE',
          muted: '#A5B8AF',
          soft: '#81958C',
        },
        night: {
          50: '#E8F3ED',
          100: '#C8DBD1',
          200: '#A2BCAD',
          300: '#78988A',
          400: '#537267',
          500: '#38564B',
          600: '#29443A',
          700: '#1D342D',
          800: '#142720',
          900: '#0D1C18',
          950: '#08130F',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 16px 45px rgba(0, 0, 0, 0.28)',
        card: '0 10px 28px rgba(0, 0, 0, 0.18)',
        glow: '0 0 48px rgba(84, 217, 154, 0.14)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(ellipse 70% 65% at 78% 38%, rgba(37, 125, 91, 0.2), transparent), radial-gradient(ellipse 55% 55% at 15% 65%, rgba(43, 83, 72, 0.24), transparent), linear-gradient(150deg, #08130F 0%, #0C1916 55%, #101820 100%)',
      },
    },
  },
  plugins: [],
};
