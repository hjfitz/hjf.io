import React from 'react'
import {graphql} from 'gatsby'
import {MDXRenderer} from 'gatsby-plugin-mdx'

import SEO from '../components/SEO'
import Layout from '../components/Layout'
import {MDXProvider} from '@mdx-js/react'

import "prismjs/themes/prism-solarizedlight.css"


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
		<article>
			<h1 className="py-2 text-4xl text-center">{mdx.frontmatter.title}</h1>
			<MDXProvider
				components={{
					h2: props => <h2 {...props} className="text-xl" />
				}}
			>
				<MDXRenderer className="">
					{mdx.body}
				</MDXRenderer>
			</MDXProvider>
		</article>
	</Layout>
)

export default Post
