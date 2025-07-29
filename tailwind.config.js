/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'accent-terracotta': 'var(--accent-terracotta)',
        'accent-green': 'var(--accent-green)',
        'text-secondary': 'var(--text-secondary)',
        'border-light': 'var(--border-light)',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        opensans: ['var(--font-opensans)', 'Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 