export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#3D5A80',
          soft: '#E8EDF3',
          light: '#5A7A9E',
          dark: '#2C4460'
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717'
        }
      },
      fontFamily: {
        sans: [
          '"Inter"', '"Geist"',
          '"Noto Sans SC"', '"HarmonyOS Sans"',
          '"PingFang SC"', '"Microsoft YaHei"',
          'sans-serif'
        ]
      },
      backdropBlur: {
        '2xl': '40px'
      },
      boxShadow: {
        'glass': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'glass-hover': '0 12px 40px rgba(0, 0, 0, 0.10)'
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
}
