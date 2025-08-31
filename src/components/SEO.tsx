/**
 * SEO component that queries for data with
 *	Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

interface SEOProps {
    description?: string
    lang?: string
    meta?: Record<string, string>[]
    img?: string
    canonical?: string
    title?: string
    type?: string
    publishedTime?: string
    modifiedTime?: string
    author?: string
    tags?: string[]
    keywords?: string[]
}

function SEO({
    description,
    lang = 'en',
    meta = [],
    title,
    img,
    canonical,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    tags = [],
    keywords = [],
}: SEOProps): React.ReactElement {
    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    author
                    authorName
                    siteUrl
                    keywords
                    twitterUsername
                    githubUsername
                    linkedinUsername
                    image
                    language
                    siteLanguage
                    siteLocale
                    twitterCardType
                    ogType
                    ogImage
                    ogImageWidth
                    ogImageHeight
                    ogImageAlt
                    siteName
                    siteDescription
                    siteKeywords
                    siteAuthor
                    siteAuthorTwitter
                    siteAuthorGithub
                    siteAuthorLinkedin
                    siteAuthorEmail
                    siteAuthorLocation
                    siteAuthorBio
                    siteAuthorSkills
                    siteAuthorInterests
                    siteAuthorProjects
                    siteAuthorSocial {
                        twitter
                        github
                        linkedin
                        mastodon
                    }
                    siteAuthorLinks {
                        phone
                        spotify
                        projects
                    }
                }
            }
        }
    `)

    const seoImg = img || `${site.siteMetadata.siteUrl}${site.siteMetadata.image}`
    const canon = canonical || site.siteMetadata.siteUrl
    const metaDescription = description || site.siteMetadata.description
    const defaultTitle = site.siteMetadata?.title
    const metaKeywords = [...site.siteMetadata.keywords, ...keywords].join(', ')
    const metaTags = tags.length > 0 ? tags.join(', ') : ''

    // Structured data for Person
    const personStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.siteMetadata.authorName,
        url: site.siteMetadata.siteUrl,
        image: seoImg,
        sameAs: [
            site.siteMetadata.siteAuthorSocial.twitter,
            site.siteMetadata.siteAuthorSocial.github,
            site.siteMetadata.siteAuthorSocial.linkedin,
            site.siteMetadata.siteAuthorSocial.mastodon
        ],
        jobTitle: 'Full-Stack Developer',
        worksFor: {
            '@type': 'Organization',
            name: 'Self-Employed'
        },
        knowsAbout: site.siteMetadata.siteAuthorSkills,
        description: site.siteMetadata.siteAuthorBio,
        address: {
            '@type': 'PostalAddress',
            addressCountry: site.siteMetadata.siteAuthorLocation
        }
    }

    // Structured data for WebSite
    const websiteStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.siteMetadata.siteName,
        description: site.siteMetadata.siteDescription,
        url: site.siteMetadata.siteUrl,
        author: {
            '@type': 'Person',
            name: site.siteMetadata.authorName,
            url: site.siteMetadata.siteUrl
        },
        publisher: {
            '@type': 'Person',
            name: site.siteMetadata.authorName,
            url: site.siteMetadata.siteUrl
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: `${site.siteMetadata.siteUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
        }
    }

    // Structured data for BlogPosting (if it's a blog post)
    const blogPostStructuredData = type === 'article' ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: metaDescription,
        image: seoImg,
        author: {
            '@type': 'Person',
            name: author || site.siteMetadata.authorName,
            url: site.siteMetadata.siteUrl
        },
        publisher: {
            '@type': 'Person',
            name: site.siteMetadata.authorName,
            url: site.siteMetadata.siteUrl
        },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canon
        },
        keywords: metaKeywords,
        articleSection: metaTags,
        url: canon
    } : null

    return (
        <Helmet
            htmlAttributes={{ lang }}
            title={title}
            titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
            meta={[
                {
                    name: 'description',
                    content: metaDescription,
                },
                {
                    name: 'keywords',
                    content: metaKeywords,
                },
                {
                    name: 'author',
                    content: author || site.siteMetadata.authorName,
                },
                {
                    name: 'robots',
                    content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
                },
                {
                    name: 'canonical',
                    content: canon,
                },
                // Open Graph
                {
                    property: 'og:title',
                    content: title,
                },
                {
                    property: 'og:description',
                    content: metaDescription,
                },
                {
                    property: 'og:type',
                    content: type,
                },
                {
                    property: 'og:image',
                    content: seoImg,
                },
                {
                    property: 'og:image:width',
                    content: site.siteMetadata.ogImageWidth.toString(),
                },
                {
                    property: 'og:image:height',
                    content: site.siteMetadata.ogImageHeight.toString(),
                },
                {
                    property: 'og:image:alt',
                    content: site.siteMetadata.ogImageAlt,
                },
                {
                    property: 'og:url',
                    content: canon,
                },
                {
                    property: 'og:site_name',
                    content: site.siteMetadata.siteName,
                },
                {
                    property: 'og:locale',
                    content: site.siteMetadata.siteLocale,
                },
                // Twitter Card
                {
                    name: 'twitter:card',
                    content: site.siteMetadata.twitterCardType,
                },
                {
                    name: 'twitter:site',
                    content: site.siteMetadata.twitterUsername,
                },
                {
                    name: 'twitter:creator',
                    content: site.siteMetadata.twitterUsername,
                },
                {
                    name: 'twitter:title',
                    content: title,
                },
                {
                    name: 'twitter:description',
                    content: metaDescription,
                },
                {
                    name: 'twitter:image',
                    content: seoImg,
                },
                {
                    name: 'twitter:image:alt',
                    content: site.siteMetadata.ogImageAlt,
                },
                // Additional meta tags
                {
                    name: 'theme-color',
                    content: '#000000',
                },
                {
                    name: 'msapplication-TileColor',
                    content: '#000000',
                },
                {
                    name: 'apple-mobile-web-app-capable',
                    content: 'yes',
                },
                {
                    name: 'apple-mobile-web-app-status-bar-style',
                    content: 'black-translucent',
                },
                {
                    name: 'apple-mobile-web-app-title',
                    content: site.siteMetadata.siteName,
                },
                {
                    name: 'application-name',
                    content: site.siteMetadata.siteName,
                },
                {
                    name: 'format-detection',
                    content: 'telephone=no',
                },
            ].concat(meta)}
        >
            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(personStructuredData)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(websiteStructuredData)}
            </script>
            {blogPostStructuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(blogPostStructuredData)}
                </script>
            )}
        </Helmet>
    )
}

export default SEO
