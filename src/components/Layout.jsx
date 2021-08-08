// todo: potentially move this to gatsby-browser.js
import React, {useEffect} from 'react'
import {Link} from 'gatsby'

import SEO from './SEO'
import Nav from './Nav'

import '../styles/main.scss'

import Footer from './Footer'

const Layout = ({children}) => {
	useEffect(() => {
		console.log('%c hjf.io ', 'background: #222; color: #fff; font-size: 32px')
		console.log('Poking about? Check my code on GitHub!')
		console.log('%c https://github.com/hjfitz?tab=repositories', 'color: #1e3a8a')
	}, [])
	return (
		<>
			<SEO />
			<div className="min-h-full text-black bg-white dark:bg-gray-900 dark:text-gray-50">
				<main className="container p-2 mx-auto md:py-8 md:px-16">
					<section className="pt-4 pb-8">
						<header className="pb-1 text-yellow-500"><Link to="/">hjf.io</Link></header>
						<Nav />
					</section>
					{children}
				</main>
				<Footer />
			</div>
		</>
	)
}

export default Layout
