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
        primary: {
          DEFAULT: "#145389",
          50: "#e6f0f9",
          100: "#c0d4eb",
          200: "#9ab8dd",
          300: "#739ccf",
          400: "#4d80c1",
          500: "#145389",
          600: "#0f4070",
          700: "#0b3059",
          800: "#363f72",
          900: "#031028",
        },   
        gray: {
            DEFAULT: "#1a1b10",
            50: "#f9fafb",
            100: "#b8b8b5",
            150: "#f3f6fd",
            200: "#98A2B3",
            300: "#475467",
            400: "#484940",
            500: "#1a1b10",
            600: "#18190f",
            700: "#5e668f",
            800: "#0e0f09",
            900: "#0b0b07",
          },
        // black: {
        //   DEFAULT: "#000000",
        //   50: "#e6e6e6",
        //   100: "#F7F8F9",
        //   200: "#8a8a8a",
        //   300: "#545454",
        //   400: "#333333",
        //   500: "#000000",
        //   600: "#161B22",
        //   700: "#0D0F11",
        //   800: "#08090A",
        //   900: "#040505",
        // },
     
        // red: {
        //   DEFAULT: "#eb4335",
        //   50: "#ffe6e6",
        //   100: "#ffbdbd",
        //   200: "#ff8f8f",
        //   300: "#ff6060",
        //   400: "#ff3232",
        //   500: "#eb4335",
        //   600: "#cc1f1f",
        //   700: "#990000",
        //   800: "#660000",
        //   900: "#330000",
        // },
        // green: {
        //   DEFAULT: "#b1eb04",
        //   50: "#f7fde6",
        //   100: "#e7f9b1",
        //   200: "#dbf68c",
        //   300: "#cbf257",
        //   400: "#c1ef36",
        //   500: "#b1eb04",
        //   600: "#a1d604",
        //   700: "#7ea703",
        //   800: "#618102",
        //   900: "#4a6302",
        // },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
