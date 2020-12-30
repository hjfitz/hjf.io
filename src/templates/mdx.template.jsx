import React from 'react'
import {graphql} from 'gatsby'
import {MDXRenderer} from 'gatsby-plugin-mdx'

import SEO from '../components/SEO'
import Layout from '../components/Layout'

export const pageQuery = graphql`
	query BlogPostQuery($id: String) {
		mdx(id: { eq: $id }) {
			id
			body
			frontmatter {
				title
				description
				date
			}
		}
	}
`

const Post = ({data: {mdx}}) => (
	<Layout>
		<SEO 
			title={mdx.frontmatter.title} 
			description={mdx.frontmatter.description}
		/>
		<article className="">
			<h1 className="">{mdx.frontmatter.title}</h1>
			<MDXRenderer className="">{mdx.body}</MDXRenderer>
		</article>
	</Layout>
)

export default Post
