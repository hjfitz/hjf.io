import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PostSummary from '../components/PostSummary'

export const pageQuery = graphql`
query HacksContentQuery {
  allMdx(filter: {frontmatter: {type: {eq: "hack"}}}, sort: {fields: frontmatter___date, order: DESC}) {
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
	return (
		<Layout>
			<SEO title="Home" />
			<section className="grid gap-4 grid-cols-1">
				{edges.map(edge => (
					<PostSummary 
						key={edge.id}
						post={edge.node.frontmatter}
					/>
				))}
			</section>
		</Layout>
	)
}

export default Blog
