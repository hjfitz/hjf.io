module.exports = {
	purge: [
		'./src/**/*.jsx',
		'./gatsby-browser.js',
	],
	darkMode: 'class', 
	theme: {
		borderWidth: {
			DEFAULT: '1px',
			'0': '0',
			'2': '2px',
			'3': '3px',
			'4': '4px',
			'6': '6px',
			'8': '8px',
			'16': '1rem',
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [
	],
}
