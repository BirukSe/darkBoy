/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"], // Enable dark mode with class-based toggle
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		// Extend border radius values
		borderRadius: {
		  lg: 'var(--radius)', // Custom radius
		  md: 'calc(var(--radius) - 2px)', // Custom radius
		  sm: 'calc(var(--radius) - 4px)', // Custom radius
		},
		// Add Inter font to font family
		fontFamily: {
		  inter: ['Inter', 'sans-serif'], // Register the Inter font
		},
		// Define custom colors
		colors: {
		  background: 'hsl(var(--background))', // Use CSS variables for color management
		  foreground: 'hsl(var(--foreground))',
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))',
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))',
		  },
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))',
			50: 'hsl(var(--primary-50))',      // Lightest shade
			100: 'hsl(var(--primary-100))',    // Light shade
			200: 'hsl(var(--primary-200))',    // Slightly darker shade
			300: 'hsl(var(--primary-300))',    // Darker shade
			400: 'hsl(var(--primary-400))',    // More dark
			500: 'hsl(var(--primary-500))',    // Main color, you should define this in your CSS vars
			600: 'hsl(var(--primary-600))',    // Darker shade
			700: 'hsl(var(--primary-700))',    // Even darker shade
			800: 'hsl(var(--primary-800))',    // Darkest shade
			900: 'hsl(var(--primary-900))',    // Deepest shade
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))',
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))',
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))',
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))',
		  },
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  chart: {
			'1': 'hsl(var(--chart-1))',
			'2': 'hsl(var(--chart-2))',
			'3': 'hsl(var(--chart-3))',
			'4': 'hsl(var(--chart-4))',
			'5': 'hsl(var(--chart-5))',
		  },
		  // Custom dark colors for background
		  'dark-1': '#121212', // Dark background color
		  'dark-2': '#1e1e1e', // Slightly lighter dark background
		  'dark-3': '#333333', // Dark gray
		  'dark-4': '#444444', // Another dark gray shade
		  // Custom light colors (optional)
		  'light-1': '#f1f1f1', // Light text/background
		  'light-2': '#e0e0e0', // Light gray
		  'light-3': '#b0b0b0', // Another light gray
		  'light-4': '#9e9e9e', // New custom light-4 color
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }
  