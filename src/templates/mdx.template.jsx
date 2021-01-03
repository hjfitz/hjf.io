import React from 'react'
import format from 'date-fns/format'
import {graphql} from 'gatsby'
import {MDXProvider} from '@mdx-js/react'
import {MDXRenderer} from 'gatsby-plugin-mdx'

import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Link from '../components/Link'

import "prism-themes/themes/prism-material-oceanic.css"


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
			<h1 className="py-2 text-5xl text-center">{mdx.frontmatter.title}</h1>
			<small>{format(new Date(mdx.frontmatter.date), 'do MMM - yyyy')}</small>
			<MDXProvider
				components={{
					h2: props => <h2 {...props} className="pt-4 text-2xl" />,
					h3: props => <h3 {...props} className="pt-3 text-xl" />,
					p: props => <p {...props} className="py-3" />,
					a: props => <Link {...props} className="text-blue-400" />,
					li: props => <li {...props} className="list-disc list-inside" />,
					code: props => <code {...props} className={`${props.className} inline-block`} />,
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
