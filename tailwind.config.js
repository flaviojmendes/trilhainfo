/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        handwritten: '"Schoolbell", cursive',
        title: "'Hanken Grotesk', sans-serif",
        content: "'Hanken Grotesk', sans-serif'",
        monospace: '"Roboto Mono", monospace',
      },
      animation: {
        checking: 'slit-in-vertical 0.2s ease-out both',
        slideInLeft: 'slideIn 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideOutLeft: 'slideOut 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideInRight: 'slideInRight 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideOutRight: 'slideOutRight 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        hide: 'hide 200ms ease-in forwards',
        fadeIn: 'fadeIn 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fadeOut: 'fadeOut 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'slit-in-vertical': {
          '0%': {
            '-webkit-transform': 'translateZ(-800px) rotateY(90deg)',
            transform: 'translateZ(-800px) rotateY(90deg)',
            opacity: '0',
          },
          '54%': {
            '-webkit-transform': 'translateZ(-160px) rotateY(87deg)',
            transform: 'translateZ(-160px) rotateY(87deg)',
            opacity: '1',
          },
          '100%': {
            '-webkit-transform': 'translateZ(0) rotateY(0)',
            transform: 'translateZ(0) rotateY(0)',
          },
        },
        hide: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
        slideOut: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(calc(100% + 16px))',
          },
        },
        slideIn: {
          from: {
            transform: 'translateX(calc(100% + 16px))',
          },
          to: {
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          from: {
            transform: 'translateX(calc(-100% - 16px))',
          },
          to: {
            transform: 'translateX(0)',
          },
        },
        slideOutRight: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(calc(-100% - 16px))',
          },
        },
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        fadeOut: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
      },
      boxShadow: {
        'primary-blue': '-12px 12px 0px 0px rgba(0, 143, 246, 0.40);',
        'primary-white': '-4px 4px 0px 0px #FDFDFD;',
        'secondary-white': '-4px 4px 0px 0px rgba(255, 255, 255, 0.80);',
      },
      

      
      backgroundImage: {
        'footer-pattern': "url('/footerpattern.svg')",
      },
      
    },
    colors: {
      'light-orange': '#F6BCA8',
      white: '#FFFFFF',
      blue: '#59c0e4',
      'dark-blue': '#50accd',
      'dark-brown': '#494443',
      'light-yellow': '#f7e3b2',
      yellow: '#eabc54',
      'dark-yellow': '#D2A94B',
      'light-brown': '#e9dad5',
      brown: '#e9dad5',
      'dark-brown': '#2A2827',
      'medium-brown': '#353231',
      red: '#ee8561',
      'dark-red': '#d56a47',
      green: '#22c55e',
      black: '#000002',
      primary: '#E1047B',
      'primary-hover': '#FC52AE',
      'primary-shadow': '#FDFDFD',
      'text-primary': '#FDFDFD',
      'box-primary': 'rgba(56, 1, 31, 0.80)',
      'box-primary-shadow':
        'linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%), rgba(56, 1, 31, 0.80);',
      'text-secondary': '#008FF6',
      'menu-background': 'rgba(255, 255, 255)',
    },
  },
  plugins: [
    'tailwind-gradient-mask-image',
    require('tailwind-gradient-mask-image'),
  ],
};
