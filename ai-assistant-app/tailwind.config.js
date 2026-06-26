/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "space-black": "#0A0A0F",
        "deep-navy": "#0D1117",
        "card-bg": "#13141F",
        "border-glow": "#1E2030",
        "neon-violet": "#7C3AED",
        "neon-violet-light": "#A78BFA",
        "electric-cyan": "#06B6D4",
        "soft-white": "#E2E8F0",
        "muted": "#64748B",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #7C3AED, 0 0 10px #7C3AED" },
          "100%": { boxShadow: "0 0 10px #7C3AED, 0 0 30px #7C3AED, 0 0 50px #A78BFA" },
        },
      },
    },
  },
  plugins: [],
};
