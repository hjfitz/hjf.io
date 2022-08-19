import React from 'react'
import format from 'date-fns/format'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Link from '../components/Link'

import 'prism-themes/themes/prism-material-oceanic.css'

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
	const { siteUrl } = site.siteMetadata
	return siteUrl + src
}

const Post = function({ data: { site, mdx } }) {
	return (
		<Layout>
			<SEO
				title={mdx.frontmatter.title}
				description={mdx.frontmatter.description}
				img={generateSEOImage(mdx, site)}
				canonical={site.siteMetadata.siteUrl + mdx.frontmatter.path}
			/>
			<article>
				<h1 className="pt-2 text-4xl font-header font-semibold">{mdx.frontmatter.title}</h1>
				<small className="text-gray-500">{format(new Date(mdx.frontmatter.date), 'do MMM - yyyy')}</small>
				<MDXProvider
					components={{
						// be awkward and hoist headings down a level for ease of writing
						h1: (props: any) => <h2 {...props} className="pt-4 text-3xl font-header font-semibold" />,
						h2: (props: any) => <h3 {...props} className="pt-3 text-2xl font-header font-semibold" />,
						h3: (props: any) => <h4 {...props} className="pt-2 text-xl font-header font-semibold" />,
						h4: (props: any) => <h4 {...props} className="pt-2 text-lg font-header" />,
						p: (props: any) => <p {...props} className="py-3 text-sm font-print" />,
						a: (props: any) => <Link {...props} className="text-blue-400" />,
						li: (props: any) => (
							<li {...props} className="list-disc text-sm list-inside" />
						),
						code: (props: any) => (
							<code
								{...props}
								className={`${props.className} text-xs inline-block`}
							/>
						)
					}}
				>
					<MDXRenderer className="">{mdx.body}</MDXRenderer>
				</MDXProvider>
			</article>
		</Layout >
	)
}

export default Post
