// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {}, // Keep extend if you have other custom Tailwind configurations
  },
  plugins: [
    require('daisyui'),
  ],
  // DaisyUI config
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"], // Import default DaisyUI light theme
          // Custom overrides for light theme:
          "base-100": "#F7F7F7", // Main background 
          "base-200": "#FFFFFF", // Card/Section Background 
          "base-content": "#333333", // Primary text 
          "neutral-content": "#666666", // Secondary text 
          "primary": "#4A90E2", // Primary accent 
          "primary-focus": "#357ABD", // Primary accent on hover 
          "secondary": "#FFC107", // Secondary accent (optional) 
          "success": "#4CAF50", // Success messages 
          "error": "#F44336", // Error messages 
          // Add other colors as needed, e.g., borders
          "border-color": "#D9D9D9", // Example for border 
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"], // Import default DaisyUI dark theme
          // Custom overrides for dark theme:
          "base-100": "#242D3D", // Main background 
          "base-200": "#2F3A4B", // Card/Section Background 
          "base-content": "#E6E6E6", // Primary text 
          "neutral-content": "#B3B3B3", // Secondary text 
          "primary": "#64B5F6", // Primary accent (slightly brighter for dark mode) 
          "primary-focus": "#90CAF9", // Primary accent on hover 
          "secondary": "#FF7043", // Secondary accent (optional) 
          "success": "#66BB6A", // Success messages 
          "error": "#EF5350", // Error messages 
          // Add other colors as needed, e.g., borders
          "border-color": "#4C5F7A", // Example for border 
        },
      },
    ],
    // Optional: Add `darkTheme: "dark",` to set the dark theme explicitly.
    // However, `prefersdark` in index.css already handles initial system preference.
  },
}