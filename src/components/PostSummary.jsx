import React from 'react'
import Img from 'gatsby-image'
import {Link} from 'gatsby'

const PostSummary = ({post}) => {
	const {path, featureImg, title, description} = post
	return (
		<div className="grid grid-cols-3 gap-6">
			<div className="">
				<Link to={path}>
					<Img fluid={featureImg.childImageSharp.fluid} />
				</Link>
			</div>
			<div className="col-span-2">
				<header>
					<Link className="text-2xl underline post-link" to={path}>{title}</Link>
				</header>
				<p className="text-lg">{description}</p>
			</div>
		</div>
	)
}

export default PostSummary
