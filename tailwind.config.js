module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // Include all files in the src directory
      "./pages/**/*.{js,ts,jsx,tsx}", // Include all files in the pages directory
    ],
    theme: {
      extend: {
        colors: {
          customRed: "#D30A40", // Add custom color
        },
      },
    },
    plugins: [],
  };