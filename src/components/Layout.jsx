// todo: potentially move this to gatsby-browser.js
import React from 'react'
import {Link} from 'gatsby'

import SEO from './SEO'
import Nav from './Nav'

import '../styles/main.scss'

const Layout = ({ children }) => (
	<>
		<SEO />
		<div className="min-h-full text-black bg-white border-black border-16 dark:bg-gray-900 dark:text-gray-50">
			<main className="container p-8 mx-auto">
				<section className="pt-4 pb-8 text-center">
					<header className="pb-8"><Link to="/">hjf.io</Link></header>
					<Nav />
				</section>
				{children}
			</main>
		</div>
	</>
);

export default Layout;
