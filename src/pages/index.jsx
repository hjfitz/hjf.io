import React, {useEffect, useState} from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PostSummary from '../components/PostSummary'
import GithubActivity from '../components/GithubActivity'
import {getGithubActivity} from "../build-tools/get-github-info"
import TwitterActivity from "../components/TwitterActivity"

export const pageQuery = graphql`
	query PageContentQuery {
		allMdx(limit: 4, filter: {frontmatter: {type: {eq: "blog"}, draft: {eq: false}}}, sort: {fields: frontmatter___date, order: DESC}) {
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

function useLiveData(context) {
	const [twithubData, setTwithubData] = useState(context)
	useEffect(() => {
		// refresh github and twitter data
		async function refresh() {
			const [ghActivity, tweets] = await Promise.all([
				getGithubActivity(),
				fetch('/.netlify/functions/twitter').then(r => r.json())
			])
			setTwithubData({ghActivity, tweets})
		}

		refresh()
	}, [])
	return twithubData
}


const IndexPage = ({pageContext, data: {allMdx: {edges}}}) => {
	const {ghActivity, tweets} = useLiveData(pageContext)
	return (
		<Layout>
			<SEO title="Home" />
			<div className="gap-16 lg:gap-32 grid grid-cols-1 md:grid-cols-3 grid-rows-2 md:grid-rows-1">
				<section className="grid auto-rows-max gap-4 grid-cols-1 row-start-2 md:row-start-1">
					<GithubActivity events={ghActivity} />
					<TwitterActivity tweets={tweets} />
				</section>
				<section className="grid gap-4 grid-cols-1 col-span-2">
					<h1 className="text-lg text-center">Recent Blogs</h1>
					{edges.map(edge => (
						<PostSummary 
							post={edge.node.frontmatter} 
							key={edge.node.id}
						/>
					))}
				</section>
			</div>
		</Layout>
	)
}

export default IndexPage
