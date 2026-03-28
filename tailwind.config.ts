import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#1e3a5f", light: "#2d5a8a", dark: "#0f2744" },
        accent: "#c9a227",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        glowPulse: {
          "0%, 100%": {
            textShadow: "0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(201, 162, 39, 0.1)",
          },
          "50%": {
            textShadow: "0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(201, 162, 39, 0.2)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-1000px 0",
          },
          "100%": {
            backgroundPosition: "1000px 0",
          },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
        glowPulse: "glowPulse 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
