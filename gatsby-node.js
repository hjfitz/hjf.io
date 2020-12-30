const path = require('path')

const mdxTemplate = path.resolve(__dirname, 'src', 'templates', 'mdx.template.jsx')


async function createPages({graphql, actions: { createPage }}) {
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
	posts.forEach(({ node }, index) => {

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

}

function onCreateNode({ node, actions: {createNodeField}, getNode }) {
	if (node.internal.type !== 'Mdx') return
	createNodeField({
		name: "slug",
		value: node.frontmatter.path,
		node,
	})
}


module.exports = {
	createPages,
	onCreateNode,
}
