import React, { HTMLAttributes } from 'react'
import { format } from 'date-fns'
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
                tags
                keywords
                author
                hideMetadata
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

function deriveCanonicalUrl(
    siteUrl?: string | null,
    pathname?: string | null
): string {
    if (siteUrl && pathname) return [siteUrl, pathname].join('')
    return 'https://hjf.io/404'
}

type MetaHeaderProps = {
    title: string
    date: Date
    path: string
    hidden: boolean
}

const toPostPath = (path: string) => `~/posts/${path?.replaceAll('/', '')}.mdx`

const MetaHeader = ({ title, date, path, hidden }: MetaHeaderProps) => {
    if (hidden) return null
    return (
        <>
            <div className="terminal-prompt mb-2">$ cat {toPostPath(path)}</div>
            <div className="terminal-separator"></div>
            <h1 className="post-title text-2xl mb-4">
                {title}
            </h1>
            <div className="post-meta mb-6">
                Published on {format(date, 'MMM dd, yyyy')}
            </div>
            <div className="terminal-separator"></div>
        </>
    )
}

const Post = ({ children, data: { site, mdx } }: PostProps) => {
    const title = mdx?.frontmatter?.title ?? 'Untitled Post'
    const description = mdx?.frontmatter?.description ?? 'Undescribed post'
    const date = new Date(mdx?.frontmatter?.date ?? 0)
    const canonicalUrl = deriveCanonicalUrl(
        site?.siteMetadata?.siteUrl,
        mdx?.frontmatter?.path
    )
    const tags = (mdx?.frontmatter?.tags as string[]) || []
    const keywords = (mdx?.frontmatter?.keywords as string[]) || []
    const author = (mdx?.frontmatter?.author as string) || 'Harry'
    const path = mdx?.frontmatter?.path ?? 'Untitled Post'
    const hideMetadata = mdx?.frontmatter?.hideMetadata || false
    return (
        <Layout>
            <SEO
                title={title}
                description={description}
                img={generateSEOImage(mdx, site)}
                canonical={canonicalUrl}
                type="article"
                publishedTime={mdx?.frontmatter?.date || undefined}
                modifiedTime={mdx?.frontmatter?.date || undefined}
                author={author}
                tags={tags}
                keywords={keywords}
            />
            <article className="container mx-auto">
                <MetaHeader title={title} date={date} path={path} hidden={hideMetadata} />

                <MDXProvider
                    components={{
                        // be awkward and hoist headings down a level for ease of writing
                        h1: (props: HTMLAttributes<HTMLHeadElement>) => (
                            <h2
                                {...props}
                                className="post-title text-xl mt-6 mb-3"
                            />
                        ),
                        h2: (props: HTMLAttributes<HTMLHeadElement>) => (
                            <h3
                                {...props}
                                className="post-title text-lg mt-5 mb-2"
                            />
                        ),
                        h3: (props: HTMLAttributes<HTMLHeadElement>) => (
                            <h4
                                {...props}
                                className="post-title text-base mt-4 mb-2"
                            />
                        ),
                        h4: (props: HTMLAttributes<HTMLHeadElement>) => (
                            <h4
                                {...props}
                                className="post-title text-sm mt-3 mb-1"
                            />
                        ),
                        p: (props: HTMLAttributes<HTMLParagraphElement>) => (
                            <p {...props} className="post-description mb-3" />
                        ),
                        a: (props: HTMLAttributes<HTMLAnchorElement>) => (
                            // @ts-expect-error yah
                            <Link {...props} />
                        ),
                        li: (props: HTMLAttributes<HTMLElement>) => (
                            <li
                                {...props}
                                className="post-description list-disc list-inside mb-1"
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
        </Layout>
    )
}

export default Post
