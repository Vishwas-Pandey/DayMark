/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // 👇 THIS FORCES THE STYLES TO EXIST IN PRODUCTION
  safelist: [
    "bg-black",
    "text-white",
    "border",
    "border-gray-300",
    "rounded-xl",
    "p-8",
    "shadow-xl",
    "hover:bg-gray-800",
    "focus:ring-black",
    "w-full",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
