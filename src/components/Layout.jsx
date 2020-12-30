import React from 'react'

import SEO from './SEO'

import '../styles/main.scss'
import {Link} from 'gatsby'

const Layout = ({children}) => {
	return (
		<>
			<SEO />
			<main className="container">
				<section>
					<header>hjf.io</header>
					<nav className="grid grid-gap-4 grid-cols-4 text-center">
						<Link to="/">Home</Link>
						<Link to="/about">About</Link>
						<Link to="/blog">Blog</Link>
						<Link to="/uses">/uses</Link>
					</nav>
				</section>
				{children}
			</main>
		</>
	)
}

export default Layout
