module.exports = {
	siteMetadata: {
		title: "Harry's Code and Bugs",
		description: "Harry's code, bugs and quick hacks",
		author: '@__hjf',
		siteUrl: process.env.SITE_URL || 'https://hjf.io/'
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-mdx',
			options: {
				gatsbyRemarkPlugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 960,
						},
					},
					'gatsby-remark-prismjs',
					'gatsby-remark-smartypants'
				]
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'posts',
				path: `${__dirname}/src/`,
			},
		},
		{
			resolve: 'gatsby-plugin-sass',
			options: {
				postCssPlugins: [
					require("tailwindcss"),
					require("./tailwind.config.js"), 
				],
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: "Harry's Code and Bugs",
				short_name: 'hjf.io',
				start_url: '/',
				background_color: '#000',
				theme_color: '#000',
				display: 'minimal-ui',
				icon: 'src/components/wizard.webp', // This path is relative to the root of the site.
			},
		},
		'gatsby-plugin-sitemap',
		'gatsby-plugin-robots-txt',
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// 'gatsby-plugin-offline',
	],
}
