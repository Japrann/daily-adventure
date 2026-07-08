/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6EC",
        ink: "#3D3A34",
        "ink-soft": "#6B6659",
        sage: {
          DEFAULT: "#7FA986",
          deep: "#5C8763",
        },
        coral: {
          DEFAULT: "#F2947D",
          deep: "#E27458",
        },
        lavender: "#C9B6E4",
        gold: "#E8B75A",
        night: {
          DEFAULT: "#1B1A2E",
          deep: "#2E2A4A",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-nunito)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(90,70,50,0.12)",
        card: "0 3px 10px rgba(90,70,50,0.06)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        xl2: "1.75rem",
      },
    },
  },
  plugins: [],
};
