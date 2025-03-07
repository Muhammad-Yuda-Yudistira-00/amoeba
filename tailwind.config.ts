import type { Config } from "tailwindcss";
import scrollbar from 'tailwind-scrollbar'

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        mutlu: ['Mutlu', 'sans-serif'],
        loversQuarrel: ['LoversQuarrel', 'sans-serif'],
        kingthingsXxtitch: ['KingthingsXxtitch', 'sans-serif'],
        horsePuke: ['HorsePuke', 'sans-serif']
      }
    },
  },
  plugins: [scrollbar],
} satisfies Config;
