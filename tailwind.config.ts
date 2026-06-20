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
        background: "#050505",
        surface: {
          100: "#0A0A0A",
          200: "#101010",
          300: "#151515",
        },
        glow: {
          primary: "#4DA6FF",
          secondary: "#7DD3FC",
        },
        accent: "#38BDF8",
        text: {
          primary: "#FFFFFF",
          secondary: "#E5E7EB",
          muted: "#9CA3AF",
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow-primary": "0 0 20px rgba(77, 166, 255, 0.4)",
        "glow-secondary": "0 0 20px rgba(125, 211, 252, 0.3)",
      },
      keyframes: {
        flash: {
          '0%': { opacity: '0' },
          '10%': { opacity: '1', filter: 'brightness(2)' },
          '100%': { opacity: '0' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        scan: {
          '0%': { left: '-100%' },
          '100%': { left: '200%' },
        }
      },
      animation: {
        flash: 'flash 2s ease-out forwards',
        gradient: 'gradient 3s linear infinite',
        scan: 'scan 3s linear infinite',
      }
    },
  },
  plugins: [],
};
export default config;
