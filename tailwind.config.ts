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
        "williams-navy": "#041E42",
        "williams-blue": "#00AEEF",
        "williams-light-blue": "#6CD3FF",
        "williams-dark": "#020B1C",
        "status-success": "#00FF87",
        "status-warning": "#FFD166",
        "status-neutral": "#94A3B8",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
