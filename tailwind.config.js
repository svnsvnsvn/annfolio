// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class
  theme: {
    extend: {
      // Custom colors for light and dark themes
      colors: {
        // Brand colors that work in both themes
        brand: {
          blue: '#288ff5',     // Primary brand blue
          shadow: '#1b3b6b',   // Darker accent blue
          pink: '#f58eb3',     // Lively pink secondary accent
        },
        
        // Dark theme specific
        dark: {
          bg: '#0d111a',       // Very dark navy-black
          surface: '#141b29',  // Slightly lighter, blue-tinted
          card: '#192236',     // Medium blue-navy
          hover: '#22304a',    // Cool blue-grey for interactions
          text: {
            primary: '#dce4f7',    // Soft cool light grey-blue
            secondary: '#9cadc9',  // Cool grey-blue
            muted: '#6d7a91',      // Desaturated navy-grey
          }
        },
        
        // Light theme specific
        light: {
          bg: '#f5f8fd',       // Soft blue-tinted white
          surface: '#f8faff',  // Almost pure white with a hint of blue
          card: '#f1f5fb',     // Pale blue-white for cards
          hover: '#e3eaf4',    // Cool pale blue-grey
          text: {
            primary: '#2b3442',    // Dark cool grey-blue
            secondary: '#596274',  // Medium cool grey
            muted: '#8d96a4',      // Light cool grey
          },
          navy: '#1b3d6d',       // Secondary brand anchor
          blue: '#288ff5',       // Main accent
          pink: '#f58eb3',       // Brand identity
        }
      },
      // Custom font family
      fontFamily: {
        'mono': ['Space Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        'sans': ['Quicksand', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      
      // Custom gradient for special elements
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #1b3d6d 0%, #288ff5 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0d111a 0%, #192236 100%)',
        'gradient-light': 'linear-gradient(135deg, #f5f8fd 0%, #f1f5fb 100%)',
      }
    },
  },
  plugins: [],
}