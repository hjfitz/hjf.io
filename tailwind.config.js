module.exports = {
	purge: [
		'./src/**/*.{j,t}sx',
		'./gatsby-browser.js',
	],
	theme: {
		borderWidth: {
			DEFAULT: '1px',
			0: '0',
			2: '2px',
			3: '3px',
			4: '4px',
			6: '6px',
			8: '8px',
			16: '1rem',
		},
		fontFamily: {
			print: ['Merriweather', 'serif'],
			header: ['Lato', 'sans-serif'],
			mono: ['JetBrains Mono', 'Source Code Pro', 'Courier New', 'monospace'],
			terminal: ['JetBrains Mono', 'Source Code Pro', 'Courier New', 'monospace'],
		},
		fontSize: {
			xs: '.75rem',
			sm: '.875rem',
			tiny: '.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '4rem',
			'7xl': '5rem',
		},
		extend: {
			colors: {
				terminal: {
					bg: '#0a0a0a',
					fg: '#00ff00',
					secondary: '#00cc00',
					accent: '#ffff00',
					muted: '#666666',
					border: '#333333',
					highlight: '#00ff00',
					error: '#ff0000',
					warning: '#ffaa00',
					info: '#0088ff',
				}
			}
		},
	},
	variants: {extend: {}},
	plugins: [
	],
}
