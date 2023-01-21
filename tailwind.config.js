/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        handwritten: '"Schoolbell", cursive',
        title: '"Poppins", sans-serif',
        content: '"Scope One", serif',
        monospace: '"Roboto Mono", monospace',
      },
      animation: {
        checking: 'slit-in-vertical 0.2s ease-out both',
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
    },
  },
  plugins: [],
};
