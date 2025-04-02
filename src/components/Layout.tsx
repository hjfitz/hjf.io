// todo: potentially move this to gatsby-browser.js
import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';

import SEO from './SEO';

import '../styles/main.scss';

console.log('%c hjf.io ', 'background: #222; color: #fff; font-size: 32px');
console.log('Poking about? Check my code on GitHub!');
console.log('%c https://github.com/hjfitz?tab=repositories', 'color: #1e3a8a');

type LayoutProps = {
	children: React.ReactNode;
};

export function useErrorTracking() {
	const [hasInitialized, setHasInitialized] = useState(false);
	useEffect(() => {
		if (hasInitialized) return;
		/*
		Sentry.init({
			dsn: '__PUBLIC_DSN__',
			integrations: [
				Sentry.browserTracingIntegration(),
				Sentry.replayIntegration(),
			],
		})
		LogRocket.init('8ydpeu/hjfio')
		LogRocket.getSessionURL((sessionURL) => {
			Sentry.configureScope((scope) => {
				scope.setExtra('sessionURL', sessionURL)
			})
		})
	*/
		setHasInitialized(true);
		//hasInitialized = true
	}, []);
}

function Layout({ children }: LayoutProps) {
	useErrorTracking();
	return (
		<>
			<SEO />
			<div className="min-h-screen bg-[#f0f0f0] text-[#222] font-mono">
				<div className="max-w-3xl mx-auto px-4 py-8">
					<header className="mb-4 border-b-2 border-[#222] pb-4">
						<h1 className="text-2xl font-bold mb-4">
							<span className="text-[#222]">~/</span>
							<span className="text-[#222] blink">_</span>
							<span className="text-[#222]">hjf.io</span>
						</h1>
						<nav className="flex space-x-6">
							<Link to="/" className="text-[#222] hover:underline">
								&gt; home
							</Link>
							<Link to="/posts" className="text-[#222] hover:underline">
								&gt; posts
							</Link>
							<Link to="/about" className="text-[#222] hover:underline">
								&gt; about
							</Link>
						</nav>
					</header>
					{children}
				</div>

				<style>{`
                    @keyframes blink {
                        0%,
                        100% {
                            opacity: 1;
                        }
                        50% {
                            opacity: 0;
                        }
                    }
                    .blink {
                        animation: blink 1s step-end infinite;
                    }
                `}</style>
			</div>
		</>
	);
}

export default Layout;
