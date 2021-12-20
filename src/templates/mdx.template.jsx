import React from 'react'
import format from 'date-fns/format'
import {graphql} from 'gatsby'
import {MDXProvider} from '@mdx-js/react'
import {MDXRenderer} from 'gatsby-plugin-mdx'

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

function generateSEOImage(mdx, site) {
	const src = mdx?.frontmatter?.featureImg?.childImageSharp?.original.src
	if (!src) return // default to wizard image
	const {siteUrl} = site.siteMetadata
	return siteUrl + src
}

const Post = ({data: {site, mdx}}) => (
	<Layout>
		<SEO
			title={mdx.frontmatter.title}
			description={mdx.frontmatter.description}
			img={generateSEOImage(mdx, site)}
			canonical={site.siteMetadata.siteUrl + mdx.frontmatter.path}
		/>
		<article>
			<h1 className="py-2 text-2xl ">{mdx.frontmatter.title}</h1>
			<small>{format(new Date(mdx.frontmatter.date), 'do MMM - yyyy')}</small>
			<MDXProvider
				components={{
					// be awkward and hoist headings down a level for ease of writing
					h1: (props) => <h2 {...props} className="pt-4 text-xl" />,
					h2: (props) => <h3 {...props} className="pt-3 text-lg" />,
					h3: (props) => <h4 {...props} className="pt-2 text" />,
					p: (props) => <p {...props} className="py-3 text-sm" />,
					a: (props) => <Link {...props} className="text-blue-400" />,
					li: (props) => (
						<li {...props} className="list-disc text-sm list-inside" />
					),
					code: (props) => (
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
	</Layout>
)

export default Post
