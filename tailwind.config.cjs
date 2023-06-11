/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "bg-black": "#0E0E0E",
        "card-blue": "#CEE4FC",
        "card-green": "#D4FDE9",
        "card-pink": "#FBCBE8",
        "card-yellow": "#FBEB8E",
        "card-purple": "#E8CBFB",
        "card-black": "#222222",
      },
    },
  },
  plugins: [],
};
