import React from 'react'
import {Link} from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PostSummary from '../components/PostSummary'


const Blog = (props) => {
	const {chunk, page} = props.pageContext
	// because gatsby serialises arrays poorly
	return (
		<Layout>
			<SEO title={`Blog - Page ${page}`} />
			<section className="grid gap-4 grid-cols-1">
				{chunk.map(edge => (
					<PostSummary 
						key={edge.id}
						post={edge.node.frontmatter}
					/>
				))}
			</section>
			<section className="flex justify-around py-4">
				{page !== 1 && <Link to={`/blog/${page - 1}`}>Prev</Link>}
				<Link to={`/blog/${page + 1}`}>Next</Link>
			</section>
		</Layout>
	)
}

export default Blog
