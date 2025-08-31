// todo: potentially move this to gatsby-browser.js
import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import LogRocket from 'logrocket'
import * as Sentry from '@sentry/gatsby'

import SEO from './SEO'
import Nav from './Nav'

import '../styles/main.scss'

import Footer from './Footer'

console.log('%c hjf.io ', 'background: #222; color: #fff; font-size: 32px')
console.log('Poking about? Check my code on GitHub!')
console.log('%c https://github.com/hjfitz?tab=repositories', 'color: #1e3a8a')

type LayoutProps = {
    children: React.ReactNode
}

export function useErrorTracking() {
    const [hasInitialized, setHasInitialized] = useState(false)
    useEffect(() => {
        if (hasInitialized) return
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
        setHasInitialized(true)
        //hasInitialized = true
    }, [])
}

function Layout({ children }: LayoutProps) {
    useErrorTracking()
    return (
        <>
            <SEO />
            <div className="min-h-full">
                <main className="container mx-auto p-4 md:p-8">
                    <section className="mb-8">
                        <Nav>
                            <header className="site-header inline-block mr-8">
                                <Link to="/" className="header-link">~/ hjf.io</Link>
                            </header>
                        </Nav>
                    </section>
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout
