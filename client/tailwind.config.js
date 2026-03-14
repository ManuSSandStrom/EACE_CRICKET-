/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F6E5",
        aqua: "#0B4192",
        coral: "#790000",
        plum: "#0B4192",
        stadium: "#0B4192",
        navy: "#062D6B",
        sportsBlue: "#0B4192",
        cricketGold: "#790000",
        energyRed: "#790000",
        paper: "#0B4192",
        ink: "#FFFFFF",
        muted: "#3A5A8C",
        royal: "#0B4192",
        gold: "#790000",
        accent: "#790000",
      },
      fontFamily: {
        heading: ["Bebas Neue", "Poppins", "sans-serif"],
        subheading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        premium: "0 20px 42px rgba(11, 65, 146, 0.25)",
        glow: "0 0 30px rgba(121, 0, 0, 0.3)",
        card: "0 16px 30px rgba(11, 65, 146, 0.15)",
      },
      backgroundImage: {
        "stadium-fade": "linear-gradient(130deg, #0B4192 0%, #062D6B 100%)",
      },
    },
  },
  plugins: [],
};

