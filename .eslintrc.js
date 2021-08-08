module.exports = {
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'react',
	],
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 0,
		'react/jsx-indent': [1, 'tab'],
		semi: ['error', 'never'],
		'object-curly-spacing': ['error', 'never'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-one-expression-per-line': 0,
		'object-curly-newline': ['error', {multiline: true}],
	},
}
