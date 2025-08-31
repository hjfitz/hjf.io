import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

function NotFoundPage() {
    return (
        <Layout>
            <SEO title="404: Not found" />
            <div className="container mx-auto text-center">
                <div className="terminal-prompt mb-2">$ ls -la /404</div>
                <div className="terminal-separator"></div>
                <div className="terminal-error text-xl mb-4">404: File not found</div>
                <div className="post-description mb-6">
                    The page you're looking for doesn't exist in this directory.
                </div>
                <div className="terminal-separator"></div>
                <Link to="/" className="nav-link">
                    > cd ~/hjf.io
                </Link>
            </div>
        </Layout>
    )
}

export default NotFoundPage
