/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mobile: { max: "743px" },
      tablet: { min: "744px", max: "1023px" },
      pc: { min: "1024px" },
      "mobile-tablet": { max: "1023px" },
      card: { min: "1024px", max: "1460px" }
    },
    extend: {
      colors: {
        "color-black-500": "#040404",
        "color-black-400": "#1f1f1f",
        "color-black-300": "#373737",
        "color-black-200": "#525252",
        "color-black-100": "#6b6b6b",

        "color-gray-500": "#808080",
        "color-gray-400": "#999999",
        "color-gray-300": "#ababab",
        "color-gray-200": "#c4c4c4",
        "color-gray-100": "#dedede",
        "color-gray-50": "#ffffff",

        "color-blue-400": "#242945",
        "color-blue-300": "#1b92ff",
        "color-blue-200": "#4da9ff",
        "color-blue-100": "#e9f4ff",
        "color-blue-50": "#f5faff",

        "color-yellow-100": "#ffc149",

        "color-red-100": "#ffeef0",
        "color-red-200": "#ff4f64",

        "color-background-100": "#fcfcfc",
        "color-background-200": "#f7f7f7",
        "color-background-300": "#efefef",
        "color-background-400": "#f4f7fb",

        "color-line-100": "#f2f2f2",
        "color-line-200": "#e6e6e6",
      },
      fontSize: {
        "3xl": ["32px", "42px"],
        "2xl": ["24px", "32px"],
        xl: ["20px", "32px"],
        "2lg": ["18px", "26px"],
        lg: ["16px", "26px"],
        md: ["14px", "24px"],
        sm: ["13px", "22px"],
        xs: ["12px", "20px"],
        "2xs": ["10px", "18px"],
      },
    },
  },
  plugins: [],
};
