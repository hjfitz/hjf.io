import React from 'react'

import SEO from './SEO'

import '../styles/main.scss'
import {Link} from 'gatsby'

const Layout = ({children}) => {
	return (
		<>
			<SEO />
			<div className="min-h-full border-black border-16">
				<main className="container mx-auto">
					<section className="text-center pt-4 pb-8">
						<header>hjf.io</header>
						<nav className=" text-4xl grid gap-4 grid-cols-4 ">
							<Link to="/">Home</Link>
							<Link to="/about">About</Link>
							<Link to="/blog">Blog</Link>
							<Link to="/uses">/uses</Link>
						</nav>
					</section>
					{children}
				</main>
			</div>
		</>
	)
}

export default Layout
