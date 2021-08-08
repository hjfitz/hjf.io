module.exports = {
	purge: [
		'./src/**/*.{j,t}sx',
		'./gatsby-browser.js',
	],
	darkMode: 'media',
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
		extend: {},
	},
	variants: {extend: {}},
	plugins: [
	],
}
