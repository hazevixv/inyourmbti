import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Frosted Color Palette - Main brand colors
        frosted: {
          50: '#F7FAFC',
          100: '#EFF5FA',
          200: '#DFEBF6',
          300: '#AAC7D8',
          400: '#92A5B3',
          500: '#768A96',
          600: '#5A6F84',
          700: '#44576D',
          800: '#344250',
          900: '#29353C',
        },
        // Accent Teal - Primary CTA color
        teal: {
          50: '#D6F7F7',
          100: '#ACEFEF',
          200: '#87E1E1',
          300: '#62D3D3',
          400: '#3DC5C5',
          500: '#18B7B7',
          600: '#159D9D',
          700: '#128383',
          800: '#0F6969',
          900: '#0D4F4F',
        },
        // Accent Sky - Secondary/Gradient color
        sky: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        // Keep existing colors for compatibility
        sage: {
          50: '#F7F9F7',
          100: '#E8EDE8',
          200: '#D1DBD1',
          300: '#B5C4B5',
          400: '#8BA888',
          500: '#6B8E88',
          600: '#567A74',
          700: '#446660',
        },
        coral: {
          50: '#FEF7F5',
          100: '#FDEEE9',
          200: '#FBD9D0',
          300: '#F8BFB3',
          400: '#E8A598',
          500: '#D88B7D',
          600: '#C87162',
        },
        lavender: {
          50: '#F8F7FB',
          100: '#F0EEF7',
          200: '#DDD8EB',
          300: '#C5BCDC',
          400: '#A8B8D8',
          500: '#8B9BC8',
          600: '#6B7FB5',
        },
        navy: {
          50: '#F7F8F9',
          100: '#E8EAED',
          200: '#D1D5DB',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4A5568',
          600: '#374151',
          700: '#1F2937',
          800: '#111827',
          900: '#0F172A',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'], // Elegant serif for headlines
        body: ['DM Sans', 'sans-serif'], // Modern & calming for body text
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #0EA5E9, #17B897)",
        "gradient-soft": "linear-gradient(135deg, #F0F9FF, #F0FCF9, #FDFCFB)",
        "gradient-navy-teal": "linear-gradient(135deg, #334E68, #17B897)",
        "gradient-sky-teal": "linear-gradient(135deg, #38BDF8, #2DCCA7)",
      },
      animation: {
        "slide-in-up": "slide-in-up 0.5s ease-out",
        "float": "float 3s ease-in-out infinite",
        "scale-in": "scale-in 0.3s ease-out",
      },
      keyframes: {
        "slide-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
