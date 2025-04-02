import React, { HTMLAttributes, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import format from 'date-fns/format';
import { graphql, Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import SEO from '../components/SEO';
import Layout from '../components/Layout';
//import Link from '../components/Link';

import 'prism-themes/themes/prism-material-oceanic.css';

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
`;

function generateSEOImage(
	mdx: PostProps['data']['mdx'],
	site: PostProps['data']['site'],
): string | undefined {
	const src = mdx?.frontmatter?.featureImg?.childImageSharp?.original?.src;
	if (!src) return; // default to wizard image
	const siteUrl = site?.siteMetadata?.siteUrl ?? 'https://hjf.io';
	return siteUrl + src;
}

type PostProps = {
	children: React.ReactNode;
	data: Queries.BlogPostQueryQuery;
};

function deriveCanonicalUrl(
	siteUrl?: string | null,
	pathname?: string | null,
): string {
	if (siteUrl && pathname) return [siteUrl, pathname].join('');
	return 'https://hjf.io/404';
}

const Post = ({ children, data: { site, mdx } }: PostProps) => {
	const title = mdx?.frontmatter?.title ?? 'Untitled Post';
	const description = mdx?.frontmatter?.description ?? 'Undescribed post';
	const date = new Date(mdx?.frontmatter?.date ?? 0);
	const path = mdx?.frontmatter?.path?.replace?.(/\//g, '') ?? '';
	const canonicalUrl = deriveCanonicalUrl(
		site?.siteMetadata?.siteUrl,
		mdx?.frontmatter?.path,
	);
	return (
		<Layout>
			<SEO
				title={title}
				description={description}
				img={generateSEOImage(mdx, site)}
				canonical={canonicalUrl}
			/>
			{/* Header */}

			{/* Back to posts */}
			<div className="mb-4">
				<Link
					to="/"
					className="inline-flex items-center text-sm hover:underline"
				>
					<ArrowLeft className="h-3 w-3 mr-1" />
					cd ..
				</Link>
			</div>

			{/* File info */}
			<div className="mb-6 font-mono text-xs text-[#555] border border-[#555] p-2 bg-[#e5e5e5]">
				<div className="flex justify-between">
					<span>File: ~/{path}.md</span>
					<span>Size: - bytes</span>
				</div>
				<div className="flex justify-between mt-1">
					<span>Created: {~~(date.getTime() / 1e3)}</span>
					<span>Author: hjf</span>
				</div>
			</div>

			{/* Post Content - Styled Markdown */}
			<div className="post-content font-mono bg-white border border-[#555] p-6 shadow-sm">
				<h1 className="pt-4 text-3xl font-semibold">{title}</h1>
				<MDXProvider
					components={{
						// be awkward and hoist headings down a level for ease of writing
						h1: (props: HTMLAttributes<HTMLHeadElement>) => (
							<h2 {...props} className="pt-4 text-2xl font-semibold" />
						),
						h2: (props: HTMLAttributes<HTMLHeadElement>) => (
							<h3 {...props} className="pt-3 text-xl font-semibold" />
						),
						h3: (props: HTMLAttributes<HTMLHeadElement>) => (
							<h4 {...props} className="pt-2 text-lg font-semibold" />
						),
						h4: (props: HTMLAttributes<HTMLHeadElement>) => (
							<h4 {...props} className="pt-2" />
						),
						p: (props: HTMLAttributes<HTMLParagraphElement>) => (
							<p {...props} className="py-3 text-sm" />
						),
						a: (props: HTMLAttributes<HTMLAnchorElement>) => (
							// @ts-expect-error yah
							<Link {...props} className="text-blue-400" />
						),
						li: (props: HTMLAttributes<HTMLElement>) => (
							<li {...props} className="text-sm list-none list-inside" />
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
			</div>

			{/* Terminal-like footer */}
			<div className="mt-8 pt-4 border-t border-[#222]">
				<div className="flex flex-col space-y-2 text-sm text-[#555]">
					<div className="flex">
						<span className="text-[#222] mr-2">$</span>
						<span>
							cat ~/{path}.md | mail -s "Sharing: {title}" friend@example.com
						</span>
					</div>
					<div className="flex">
						<span className="text-[#222] mr-2">$</span>
						<Link to="/" className="hover:underline">
							cd ~/posts
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Post;
