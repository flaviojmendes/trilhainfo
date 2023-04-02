/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'brutalist-light': '3px 4px 0px 1px #000',
        'brutalist-light-hover': '5px 6px 0px 1px #000',
        'brutalist-neg': '-3px 4px 0px 1px #000',
        'brutalist-neg-hover': '-4px 5px 0px 1px #000',

        'brutalist-red': '3px 4px 0px 1px #ee8561',
        'brutalist-red-hover': '5px 6px 0px 1px #ee8561',

        'brutalist-yellow': '3px 4px 0px 1px #eabc54',
        'brutalist-yellow-hover': '5px 6px 0px 1px #eabc54',
      },
      fontFamily: {
        handwritten: '"Schoolbell", cursive',
        title: '"Poppins", sans-serif',
        content: '"Scope One", serif',
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
      green: '#228B22',
      'light-green': '#a7f3d0',
      'light-blue': '#BCE5F4',
    },
  },
  plugins: [],
};
