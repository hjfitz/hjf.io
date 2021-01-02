import React from 'react'
import Img from 'gatsby-image'
import {Link} from 'gatsby'
import format from 'date-fns/format'

const PostSummary = ({post}) => {
	const {path, featureImg, title, description, date} = post
	return (
		<div className="grid grid-cols-3 gap-6">
			<div className="flex flex-col justify-center">
				<Link to={path}>
					<Img fluid={featureImg.childImageSharp.fluid} />
				</Link>
			</div>
			<div className="flex flex-col justify-center col-span-2">
				<header>
					<Link className="text-2xl underline post-link" to={path}>{title}</Link>
				</header>
				<small>{format(new Date(date), 'do MMM - yyyy')}</small>
				<p className="text-lg">{description}</p>
			</div>
		</div>
	)
}

export default PostSummary
