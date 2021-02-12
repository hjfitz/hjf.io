// todo: potentially move this to gatsby-browser.js
import React, {useEffect} from 'react'
import {Link} from 'gatsby'

import SEO from './SEO'
import Nav from './Nav'

import '../styles/main.scss'

const Layout = ({ children }) => {
	useEffect(() => {
		console.log('%c hjf.io ', 'background: #222; color: #fff; font-size: 32px')
		console.log('Poking about? Check my code on GitHub!')
		console.log('%c https://github.com/hjfitz?tab=repositories', 'color: #1e3a8a')
	}, [])
	return (
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
}

export default Layout;
