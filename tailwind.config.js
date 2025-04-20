import twElementPlugin from "tw-elements/dist/plugin.cjs"

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {     
    extend: {
      colors:{
        "primaryblue": "#001fab",
        "secondaryblue": "#001faa",
        "thirdblue": "#001eaa",
        "darkblue": "#050a30",
        "lightblueone": "#0055fb",
        "lightbluetwo": "#0054fb",
        "greenone": "#00bf63",
        "orangeone": "#ff914d",
        "amarilloone": "#ffde59"
      }
    },
  },
  plugins: [twElementPlugin],
}