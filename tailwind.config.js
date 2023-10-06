/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      textColor: {
        "primary-color": "var(--primary-text-color)",
        "blue-info-color": "var(--blue-info-color)",
        "primary-color-inverted": "var(--primary-text-color-inverted)",
        "secondary-color": "var(--secondary-text-color)",
        "tertiary-color": "var(--tertiary-text-color)",
      },
      backgroundColor: {
        "primary-color": "var(--primary-bg-color)",
        "primary-color-inverted": "var(--primary-bg-color-inverted)",
        "button-accent": "var(--button-accent-color)",
        "button-disabled-accent": "var(--button-disabled-accent-color)",
        "blue-info-color": "var(--blue-info-color)",
        "green-success-color": "var(--green-success-color)",
      },
      backgroundImage: {
        login: "var(--login-background-image)",
        "sign-up": "var(--sign-up-background-image)"
      },
      fontFamily: {
        playfair: ["var(--font-playfair-display)"],
        manrope: ["var(--font-manrope)"],
        fjord: ["var(--font-fjord)"],
      },
      keyframes: {
        beating: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.12)" },
        },
      },
      animation: {
        beating: "beating 0.8s ease-in-out infinite",
      },
    }
  },
  plugins: []
}

