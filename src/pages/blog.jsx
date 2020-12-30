import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/Layout"
import SEO from "../components/SEO"

export const pageQuery = graphql`
	query BlogContentQuery {
		allMdx {
			edges {
				node {
					id
					timeToRead
					frontmatter {
						path
						title
						date
						description
						featureImg {
							childImageSharp {
								fluid(maxWidth: 400) {
									...GatsbyImageSharpFluid
								}
							}
						}
					}
				}
			}
		}
	}
`

const Blog = ({data: {allMdx: {edges}}}) => {
	console.log(edges[0])
	return (
		<Layout>
			<SEO title="Home" />
			<section className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
			{edges.map(edge => (JSON.stringify(edge)))}
			</section>
			<section className="grid gap-2 grid-cols-1 sm:grid-cols-2">
				<div>github bits</div>
				<div>twitter bits</div>
			</section>
		</Layout>
	)
}

export default Blog
