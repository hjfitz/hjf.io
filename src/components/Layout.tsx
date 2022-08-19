// todo: potentially move this to gatsby-browser.js
import React, { useEffect } from "react";
import { Link } from "gatsby";
import LogRocket from "logrocket";
import * as Sentry from "@sentry/gatsby";

import SEO from "./SEO";
import Nav from "./Nav";

import "../styles/main.scss";

import Footer from "./Footer";

console.log("%c hjf.io ", "background: #222; color: #fff; font-size: 32px");
console.log("Poking about? Check my code on GitHub!");
console.log("%c https://github.com/hjfitz?tab=repositories", "color: #1e3a8a");

interface LayoutProps {
	children: React.ReactNode;
}

let hasInitialized = false;
export function useErrorTracking() {
	useEffect(() => {
		if (hasInitialized) return;
		LogRocket.init("8ydpeu/hjfio");
		LogRocket.getSessionURL((sessionURL) => {
			Sentry.configureScope((scope) => {
				scope.setExtra("sessionURL", sessionURL);
			});
		});
		hasInitialized = true;
	}, []);
}

const Layout = ({ children }: LayoutProps) => {
	useErrorTracking();
	return (
		<>
			<SEO />
			<div className="min-h-full text-black bg-white">
				<main className="container p-2 mx-auto md:py-8 md:px-16 px-8">
					<section className="pt-4 pb-8 text-xl font-header">
						<header className="pb-1 text-yellow-500 inline-block mr-2">
							<Link to="/">hjf.io</Link>
						</header>
						<Nav />
					</section>
					{children}
				</main>
				<Footer />
			</div>
		</>
	);
};

export default Layout;
