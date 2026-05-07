/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      keyframes: {
        "shadow-pulse": {
          "0%": { boxShadow: "0 0 0 0px rgba(59, 130, 246, 0.7)" },
          "70%": { boxShadow: "0 0 0 10px rgba(59, 130, 246, 0)" },
          "100%": { boxShadow: "0 0 0 0px rgba(59, 130, 246, 0)" },
        },
      },
      animation: {
        "shadow-pulse": "shadow-pulse 2s infinite",
      },
    },
  },
};
