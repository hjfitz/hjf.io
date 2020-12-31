import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PostSummary from '../components/PostSummary'

export const pageQuery = graphql`
	query PageContentQuery {
		allMdx(limit: 4, filter: {frontmatter: {type: {eq: "blog"}}}) {
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

const IndexPage = ({data: {allMdx: {edges}}}) => {
	console.log(edges[0])
	return (
		<Layout>
			<SEO title="Home" />
			<div className="grid grid-cols-1 grid-rows-2 md:grid-cols-3">
				<section className="grid gap-2 grid-cols-1 row-start-2 md:row-start-1">
					<div>github bits</div>
					<div>twitter bits</div>
				</section>
				<section className="grid gap-4 grid-cols-1 col-span-2">
					{edges.map(edge => (
						<PostSummary 
							post={edge.node.frontmatter} 
							key={edge.id}
						/>
					))}
				</section>
			</div>
		</Layout>
	)
}

export default IndexPage
