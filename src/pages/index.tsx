import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PostSummary from '../components/PostSummary'

export const pageQuery = graphql`
  query PageContentQuery {
    allMdx(
      limit: 8
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

const IndexPage = function({
	data: { allMdx: { edges } },
}) {
	return (
		<Layout>
			<SEO title="Home" />
			<div className="gap-16 lg:gap-32 grid grid-cols-1 md:grid-cols-3 auto-rows-auto">
				<section className="grid gap-4 col-span-3">
					{edges.map((edge) => (
						<PostSummary post={edge.node.frontmatter} key={edge.node.id} />
					))}
				</section>
			</div>
		</Layout>
	)
}

export default IndexPage
