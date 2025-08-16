/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // or 'media' if you prefer system-based
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        scroll: "scroll linear infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".pause": { "animation-play-state": "paused" },
        ".running": { "animation-play-state": "running" },
      });
    },
  ],
};
