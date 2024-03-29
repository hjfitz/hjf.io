import React, {useEffect, useRef} from 'react'
import format from 'date-fns/format'
import {graphql} from 'gatsby'
import {MDXProvider} from '@mdx-js/react'
import {MDXRenderer} from 'gatsby-plugin-mdx'

import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Link from '../components/Link'

import 'prism-themes/themes/prism-material-oceanic.css'
import {Helmet} from 'react-helmet'

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
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

function generateSEOImage(mdx, site): string {
	const src = mdx?.frontmatter?.featureImg?.childImageSharp?.original.src
	if (!src) return // default to wizard image
	const {siteUrl} = site.siteMetadata
	return siteUrl + src
}

function Post({data: {site, mdx}}) {
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
		utterances.current && utterances.current.appendChild(s)
		/*
		utterances.current.innerHTML = `
				<script
					src="https://utteranc.es/client.js"
					repo="hjfitz/hjf.io"
					issue-term="title"
					label="discussion"
					theme="preferred-color-scheme"
					crossOrigin="anonymous"
					async
				/>
		`
				*/
	}, [])
	return (
		<Layout>
			<SEO
				title={mdx.frontmatter.title}
				description={mdx.frontmatter.description}
				img={generateSEOImage(mdx, site)}
				canonical={site.siteMetadata.siteUrl + mdx.frontmatter.path}
			/>
			<article>
				<h1 className="pt-2 text-4xl font-semibold font-header">{mdx.frontmatter.title}</h1>
				<small className="text-gray-500">{format(new Date(mdx.frontmatter.date), 'do MMM - yyyy')}</small>
				<MDXProvider
					components={{
						// be awkward and hoist headings down a level for ease of writing
						h1: (props: any) => <h2 {...props} className="pt-4 text-3xl font-semibold font-header" />,
						h2: (props: any) => <h3 {...props} className="pt-3 text-2xl font-semibold font-header" />,
						h3: (props: any) => <h4 {...props} className="pt-2 text-xl font-semibold font-header" />,
						h4: (props: any) => <h4 {...props} className="pt-2 text-lg font-header" />,
						p: (props: any) => <p {...props} className="py-3 text-sm font-print" />,
						a: (props: any) => <Link {...props} className="text-blue-400" />,
						li: (props: any) => (
							<li {...props} className="text-sm list-disc list-inside font-print" />
						),
						code: (props: any) => (
							<code
								{...props}
								className={`${props.className} text-xs inline-block`}
							/>
						),
					}}
				>
					<MDXRenderer className="">{mdx.body}</MDXRenderer>
				</MDXProvider>
			</article>
			<section ref={utterances} />
		</Layout>
	)
}

export default Post
