/**
 * @type {import('gatsby').GatsbyConfig}
 */
const config = {
    siteMetadata: {
        title: "Harry's Code and Bugs",
        description: "Harry's code, bugs and quick hacks",
        author: '@__hjf',
        siteUrl: 'https://hjf.io/',
    },
    graphqlTypegen: {
        typesOutputPath: `gatsby-types.d.ts`,
        generateOnBuild: false,
        documentSearchPaths: [`./gatsby-node.ts`],
    },
    trailingSlash: `always`,

    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                gatsbyRemarkPlugins: [
                    {
                        resolve: 'gatsby-remark-images',
                        options: { maxWidth: 960 },
                    },
                    'gatsby-remark-prismjs',
                    'gatsby-remark-smartypants',
                ],
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'posts',
                path: `${__dirname}/src/`,
            },
        },
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaults: {
                    formats: [`auto`, `webp`],
                    placeholder: `dominantColor`,
                    quality: 50,
                    breakpoints: [750, 1080, 1366, 1920],
                    backgroundColor: `transparent`,
                    blurredOptions: {},
                    jpgOptions: {},
                    pngOptions: {},
                    webpOptions: {},
                    avifOptions: {},
                },
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-image`,
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
        {
            resolve: 'gatsby-plugin-feed',
            options: {
                query: `
					{
					site {
						siteMetadata {
						title
						description
						siteUrl
						author
						}
					}
					}
				`,
                feeds: [
                    {
                        serialize: ({ query: { site, allMdx } }) =>
                            allMdx.edges.map((edge) => ({
                                ...edge.node.frontmatter,
                                ...{
                                    description:
                                        edge.node.frontmatter.description,
                                    date: edge.node.frontmatter.date,
                                    url:
                                        site.siteMetadata.siteUrl +
                                        edge.node.frontmatter.path,
                                    guid:
                                        site.siteMetadata.siteUrl +
                                        edge.node.frontmatter.path,
                                },
                            })),
                        query: `query BlogContentQuery {
  allMdx(
    filter: {frontmatter: {type: {eq: "blog"}, draft: {eq: false}}}
    sort: {frontmatter: {date: DESC}}
  ) {
    edges {
      node {
        frontmatter {
          path
          title
          date
          draft
          description
        }
      }
    }
  }
}`,
                        output: '/rss.xml',
                        title: "hjf's feed",
                    },
                ],
            },
        },
        'gatsby-plugin-sitemap',
        'gatsby-plugin-postcss',
        'gatsby-plugin-sass',
        'gatsby-plugin-robots-txt',
        {
            resolve: '@sentry/gatsby',
            options: {
                dsn: 'https://7b1e3179a9d045eeb04665283af84a3d@o877428.ingest.sentry.io/5836807',
                sampleRate: 1.0,
            },
        },
        {
            resolve: 'gatsby-plugin-typescript',
            options: {
                isTSX: true, // defaults to false
                jsxPragma: 'jsx', // defaults to "React"
                allExtensions: true, // defaults to false
            },
        },
        {
            resolve: 'gatsby-plugin-google-gtag',
            options: {
                trackingIds: ['G-M4R9J0L5BR'],
                gtagConfig: {
                    anonymize_ip: true,
                    cookie_expires: 0,
                },
                pluginConfig: {
                    head: false,
                    respectDNT: true,
                },
            },
        },
        {
            resolve: 'gatsby-plugin-google-fonts',
            options: {
                fonts: ['Merriweather', 'Lato\:500'],
                display: 'swap',
            },
        },
    ],
}

module.exports = config
