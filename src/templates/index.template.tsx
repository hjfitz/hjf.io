import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PostSummary from '../components/PostSummary'

import type { IndexPageProps } from '../types/index-template'

const IndexPage = (props: IndexPageProps) => {
    const { chunk, page } = props.pageContext
    console.log(JSON.stringify(props, null, 2))
    const prevLink =
        page === 2 ? (
            <Link to="/">Prev</Link>
        ) : (
            <Link to={`/${page - 1}`}>Prev</Link>
        )
    return (
        <Layout>
            <SEO title="Home" />
            <div className="gap-16 lg:gap-32 grid grid-cols-1 md:grid-cols-3 auto-rows-auto">
                <section className="grid gap-8 col-span-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {chunk.map((edge) => (
                        <PostSummary
                            post={edge.node.frontmatter}
                            key={edge.node.id}
                        />
                    ))}
                </section>
            </div>
            <section className="flex justify-around py-4">
                {page !== 1 && prevLink}
                <Link to={`/${page + 1}`}>Next</Link>
            </section>
        </Layout>
    )
}

export default IndexPage
