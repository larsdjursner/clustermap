module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      height: (theme) => ({
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
        "screen4/5": "calc(100vh * 4 / 5 )",
        "nav": "3rem",
        "body": "calc(100vh - 3rem)",

      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
