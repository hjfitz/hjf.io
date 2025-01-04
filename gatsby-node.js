const path = require('path')
const {getGithubActivity} = require('./src/build-tools/get-github-info')
const {getTwitterTweets} = require('./src/build-tools/get-twitter-tweets')

const templatesDir = path.resolve(__dirname, 'src', 'templates')
const mdxTemplate = path.resolve(templatesDir, 'mdx.template.tsx')
const paginatedBlogTemplate = path.resolve(templatesDir, 'blog.template.jsx')
const paginatedHomepageTemplate = path.resolve(templatesDir, 'index.template.tsx')

async function createPages({graphql, actions: {createPage}}) {
	// create all pages from mdx
	const result = await graphql(`
    query MyQuery {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              path
              title
              date
              draft
            }
          }
        }
      }
    }
  `)
	const posts = result.data.allMdx.edges

	// We'll call `createPage` for each result
	posts.forEach(({node}) => {
		if (node.frontmatter.draft) return

		console.log(`creating ${node.frontmatter.path}`)
		createPage({
			path: node.frontmatter.path,
			// This component will wrap our MDX content
			component: mdxTemplate,
			// We can use the values in this context in
			// our page layout component
			context: node,
		})
	})

	// create the blog pages - paginated
	const blogResult = await graphql(`
    query BlogContentQuery {
      allMdx(
        filter: { frontmatter: { type: { eq: "blog" }, draft: { eq: false } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            id
            timeToRead
            frontmatter {
              path
              title
              date
              draft
              description
              featureImg {
                childImageSharp {
                  fluid(maxWidth: 400) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

	const chunked = blogResult.data.allMdx.edges.reduce((acc, cur, idx) => {
		if (idx % 10 === 0) acc.push([])
		acc[acc.length - 1].push(cur)
		return acc
	}, [])

	chunked.forEach((chunk, idx) => {
		const page = ++idx

	    // const path = `/blog/${page}`
	    let path
	    if (page === 1) {
			path = '/'
	    } else {
			path = `/${page}`
	    }

		const pageParams = {
			path,
			context: {chunk, page},
		    // component: paginatedBlogTemplate,
		    component: paginatedHomepageTemplate,
		}

		console.log(`creating blog page ${page}`)
	    console.log(pageParams.path)

		createPage(pageParams)

		// have a nice blog landing page
		if (page === 1) createPage({...pageParams, path: '/blog'})
	})
}

function onCreateNode({
	node, actions: {createNodeField}, getNode,
}) {
	if (node.internal.type !== 'Mdx') return
	createNodeField({
		name: 'slug',
		value: node.frontmatter.path,
		node,
	})
}

async function onCreatePage({page, actions: {createPage, deletePage}}) {
	if (page.path === '//////') {
		console.log('modifying home page')
		const [ghActivity] = await Promise.all([getGithubActivity()])

		deletePage(page)

		createPage({
			...page,
			context: {
				...page.context,
				ghActivity,
			},
		})
	}
}

function onCreateWebpackConfig({actions}) {
	actions.setWebpackConfig({resolve: {fallback: {fs: false}}})
}

module.exports = {
	createPages,
	onCreateNode,
	onCreatePage,
	onCreateWebpackConfig,
}
