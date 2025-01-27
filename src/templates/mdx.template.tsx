import React, { HTMLAttributes, useEffect, useRef } from 'react'
import format from 'date-fns/format'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'

import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Link from '../components/Link'

import 'prism-themes/themes/prism-material-oceanic.css'

export const pageQuery = graphql`
    query BlogPostQuery($id: String) {
        mdx(id: { eq: $id }) {
            id
            frontmatter {
                title
                description
                date
                path
                featureImg {
                    childImageSharp {
                        original {
                            src
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                siteUrl
            }
        }
    }
`

function generateSEOImage(
    mdx: PostProps['data']['mdx'],
    site: PostProps['data']['site']
): string | undefined {
    const src = mdx?.frontmatter?.featureImg?.childImageSharp?.original?.src
    if (!src) return // default to wizard image
    const siteUrl = site?.siteMetadata?.siteUrl ?? 'https://hjf.io'
    return siteUrl + src
}

type PostProps = {
    children: React.ReactNode
    data: Queries.BlogPostQueryQuery
}

function useUtterances(): React.LegacyRef<HTMLElement> | undefined {
    const utterances = useRef<HTMLElement>()
    useEffect(() => {
        if (typeof window === 'undefined' || !utterances) {
            return
        }
        const s = document.createElement('script')
        s.src = 'https://utteranc.es/client.js'
        s.setAttribute('repo', 'hjfitz/hjf.io')
        s.setAttribute('issue-term', 'title')
        s.setAttribute('label', 'discussion')
        s.crossOrigin = 'anonymous'
        s.async = true
        utterances?.current?.appendChild(s)
    }, [])
    // @ts-expect-error needs beer
    return utterances
}

function deriveCanonicalUrl(
    siteUrl?: string | null,
    pathname?: string | null
): string {
    if (siteUrl && pathname) return [siteUrl, pathname].join('')
    return 'https://hjf.io/404'
}

const Post = ({ children, data: { site, mdx } }: PostProps) => {
    const utterances = useUtterances()
    const title = mdx?.frontmatter?.title ?? 'Untitled Post'
    const description = mdx?.frontmatter?.description ?? 'Undescribed post'
    const date = new Date(mdx?.frontmatter?.date ?? 0)
    const canonicalUrl = deriveCanonicalUrl(
        site?.siteMetadata?.siteUrl,
        mdx?.frontmatter?.path
    )
    return (
        <Layout>
            <SEO
                title={title}
                description={description}
                img={generateSEOImage(mdx, site)}
                canonical={canonicalUrl}
            />
            <article className="container mx-auto">
                <h1 className="pt-2 text-4xl font-semibold font-header">
                    {title}
                </h1>
                <small className="text-gray-500">
                    Published on {format(date, 'd MMMM yyyy')}
                </small>
                <MDXProvider
                    components={{
                        // be awkward and hoist headings down a level for ease of writing
                        h1: (props: HTMLAttributes<HTMLHeadElement>) => (
                            <h2
                                {...props}
                                className="pt-4 text-3xl font-semibold font-header"
                            />
                        ),
                        h2: (props: HTMLAttributes<HTMLHeadElement>) => (
                            <h3
                                {...props}
                                className="pt-3 text-2xl font-semibold font-header"
                            />
                        ),
                        h3: (props: HTMLAttributes<HTMLHeadElement>) => (
                            <h4
                                {...props}
                                className="pt-2 text-xl font-semibold font-header"
                            />
                        ),
                        h4: (props: HTMLAttributes<HTMLHeadElement>) => (
                            <h4
                                {...props}
                                className="pt-2 text-lg font-header"
                            />
                        ),
                        p: (props: HTMLAttributes<HTMLParagraphElement>) => (
                            <p {...props} className="py-3 text-sm font-print" />
                        ),
                        a: (props: HTMLAttributes<HTMLAnchorElement>) => (
                            // @ts-expect-error yah
                            <Link {...props} className="text-blue-400" />
                        ),
                        li: (props: HTMLAttributes<HTMLElement>) => (
                            <li
                                {...props}
                                className="text-sm list-disc list-inside font-print"
                            />
                        ),
                        code: (props: HTMLAttributes<HTMLElement>) => (
                            <code
                                {...props}
                                className={`${props.className} text-xs inline-block`}
                            />
                        ),
                    }}
                >
                    {/* @ts-expect-error mdx things */}
                    {children}
                </MDXProvider>
            </article>
            <section ref={utterances} />
        </Layout>
    )
}

export default Post
