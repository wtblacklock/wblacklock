/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      // Override all font families with Inter only - NO fallbacks
      serif: ['Inter'],
      sans: ['Inter'],
      mono: ['Inter'],
    },
  },
  plugins: [],
}
