import { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "*.{js,jsx,mdx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: '#A31D1D',
  				foreground: '#FFFFFF'
  			},
  			secondary: {
  				DEFAULT: '#9CABC2',
  				foreground: '#000000'
  			},
  			destructive: {
  				DEFAULT: '#FF2727',
  				foreground: '#FFFFFF'
  			},
  			muted: {
  				DEFAULT: '#F8F2DE',
  				foreground: '#000000'
  			},
  			accent: {
  				DEFAULT: '#E5D0AC',
  				foreground: '#000000'
  			},
  			popover: {
  				DEFAULT: '#FFFFFF',
  				foreground: '#000000'
  			},
  			card: {
  				DEFAULT: '#FFFFFF',
  				foreground: '#000000'
  			},
  			'custom-red': {
  				DEFAULT: '#A31D1D',
  				light: '#FF2727',
  				dark: '#AD0000',
  				darker: '#A50000'
  			},
  			'custom-cream': {
  				DEFAULT: '#F8F2DE',
  				dark: '#F5EEDC'
  			},
  			'custom-blue': {
  				DEFAULT: '#9CABC2'
  			},
  			'custom-beige': {
  				DEFAULT: '#E5D0AC'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} 

export default config
