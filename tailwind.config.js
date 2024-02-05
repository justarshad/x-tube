/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        light_brandBlack: "#212121",
        light_text_1000: "#1f1f1f",
        light_text_900: "#2f2f2f",
        light_text_800: "#3f3f3f",
        light_text_600: "#4f4f4f",
        light_text_400: "#5f5f5f",
        light_text_200: "#6f6f6f",
        light_bg_00: "#fdfdfd",
        light_bg_20: "#f5f5f5",
        light_bg_50: "#f0f0f0",
        light_bg_100: "#e0e0e0",
        light_bg_200: "#dfdfdf",
        light_brandRed: "#FF0000",
        light_dividerColor: "#dbdbdb",
        light_blue_00: "#6dbbff",
        light_blue_200: "#125fd3",
        light_bg_00: "#fdfdfd",
        light_bg_200: "#f4f4f4",
        light_bg_400: "#dfdfdf",
        light_border: "#cdcdcd",

        dark_text_1000: "#f0f0f0",
        dark_text_900: "#e0e0e0",
        dark_text_800: "#d9d9d9",
        dark_text_600: "#c0c0c0",
        dark_text_400: "#a5a5a5",
        dark_text_200: "#101010",

        dark_bg_00: "#0f0f0f",
        dark_bg_10: "#303030",
        dark_bg_100: "#7e7e7e",
        dark_bg_200: "#727272",
        dark_bg_300: "#666666",
        dark_bg_400: "#595959",
        dark_bg_500: "#4c4c4c",
        dark_bg_600: "#333333",
        dark_bg_700: "#262626",
        dark_bg_800: "#191919",
        dark_bg_900: "#0c0c0c",
        dark_bg_1000: "#000000",
        // dark_bg_100: "#1d1d1d",
        // dark_bg_100: "#1d1d1d",
        // dark_bg_100: "#1d1d1d",
        // dark_bg_100: "#1d1d1d",
        // dark_bg_100: "#1d1d1d",
        // dark_bg_100: "#1d1d1d",
        // dark_brandBlack: "#212121",
        // dark_brandRed: "#FF0000",
        dark_dividerColor: "#dbdbdb",
        // dark_blue_200: "#62b5fd27",
        // dark_blue_600: "#3f51b5",
        // dark_blue_400: "#3ea6ff",
        // dark_bg_00: "#fdfdfd",
        // dark_bg_200: "#f4f4f4",
        // dark_bg_400: "#dfdfdf",
        // dark_border: "#cdcdcd",


      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(16rem, 1fr))'
      },
      backgroundImage: {
        'duration_bg_light': "radial-gradient(red 5%, yellow 15%, green 60%)",
      }
    },
  },
  plugins: [],
  darkMode: "class",
}

