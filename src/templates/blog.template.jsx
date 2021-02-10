import React from 'react'
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PostSummary from '../components/PostSummary'

const JSONHelper = ({json}) => {
	const str = JSON.stringify(json, null, 2)
	return (
		<div className="gatsby-highlight" data-language="json">
			<pre className="language-json">
				<code className="inline-block language-json">
					{str}
				</code>
			</pre>
		</div>
	)
}

const Blog = (props) => {
	// what the fuck is going on here???
	const edges = Object.values(props.pageResources.json.pageContext)

	let {length, [length - 1]: page} = window.location.pathname.split('/').filter(Boolean)

	if (isNaN(page)) page = 1
	page = parseInt(page, 10)

	return (
		<Layout>
			<SEO title={`Blog - Page ${page}`} />
			<section className="grid gap-4 grid-cols-1">
				{edges.map(edge => (
					<PostSummary 
						key={edge.id}
						post={edge.node.frontmatter}
					/>
				))}
			</section>
			<section className="flex justify-around">
				{page !== 1 && <Link to={`/blog/${page - 1}`}>Prev</Link>}
				<Link to={`/blog/${page + 1}`}>Next</Link>
			</section>
		</Layout>
	)
}

export default Blog
