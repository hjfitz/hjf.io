import React from 'react';

import SEO from './SEO';

import '../styles/main.scss';
import { Link } from 'gatsby';

// todo: potentially move this to gatsby-browser.js
const Layout = ({ children }) => (
	<>
		<SEO />
		<div className="min-h-full text-black bg-white border-black border-16 dark:bg-gray-900 dark:text-gray-50">
			<main className="container p-8 mx-auto">
				<section className="pt-4 pb-8 text-center">
					<header className="pb-8">hjf.io</header>
					<nav className="text-4xl grid gap-4 sm:grid-cols-4">
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
);

export default Layout;
