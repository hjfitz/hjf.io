import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/Layout"
import SEO from "../components/SEO"

const About = () => {
	return (
		<Layout>
			<SEO title="About" />
			<section>About me</section>
		</Layout>
	)
}

export default About 
