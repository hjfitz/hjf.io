import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PostSummary from '../components/PostSummary'

import type { IndexPageProps } from '../types/index-template'

const IndexPage = (props: IndexPageProps) => {
    const { chunk, page } = props.pageContext
    const prevLink =
        page === 2 ? (
            <Link className="pagination-link" to="/">Prev</Link>
        ) : (
            <Link className="pagination-link" to={`/${page - 1}`}>Prev</Link>
        )
    return (
        <Layout>
            <SEO 
                title="Home"
                description="Harry's Code and Bugs - A developer's journey through JavaScript, TypeScript, React, and modern web development. Read about coding, debugging, and quick hacks."
                keywords={[
                    'web development blog',
                    'javascript blog',
                    'typescript blog',
                    'react blog',
                    'programming blog',
                    'developer blog',
                    'coding blog',
                    'tech blog',
                    'software development blog'
                ]}
                type="website"
            />
            <div className="terminal-prompt mb-2">$ ls -la ~/posts/</div>
            <div className="terminal-separator"></div>
            <div className="post-grid">
                {chunk.map((edge) => (
                    <PostSummary
                        post={edge.node.frontmatter}
                        timeToReadMinutes={edge.timeToReadMinutes}
                        key={edge.node.id}
                    />
                ))}
            </div>
            <div className="pagination">
                {page !== 1 && prevLink}
                <Link className="pagination-link" to={`/${page + 1}`}>Next</Link>
            </div>
        </Layout>
    )
}

export default IndexPage
