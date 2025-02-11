import type { Config } from 'tailwindcss'

export default {
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
        primary: '#01c38d',
        error: '#d62828',
        info: '#5aa9e6',
        warning: '#f77f00',
        muiBackground: {
          paper: '#19212c',
          default: '#11161e',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
