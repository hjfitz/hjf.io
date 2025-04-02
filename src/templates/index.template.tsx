import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostSummary from '../components/PostSummary';

import type { IndexPageProps } from '../types/index-template';

const NewPostSummary = ({ title, path, date }) => {
	return (
		<li className="border-b border-dashed border-[#555] pb-2">
			<div className="flex justify-between items-baseline">
				<Link to={path} className="text-[#222] hover:underline font-bold">
					{title}
				</Link>
				<span className="text-sm text-[#555]">
					{new Date(date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'short',
						day: 'numeric',
					})}
				</span>
			</div>
			<div className="mt-1 text-sm">
				<Link to={path} className="text-[#555] hover:underline">
					cat ~/{path.replaceAll('/', '')}.md
				</Link>
			</div>
		</li>
	);
};

const NewHomepage = (props: IndexPageProps) => {
	const { chunk, page } = props.pageContext;

	return (
		<Layout>
			<SEO title="Home" />
			<main>
				<div className="mb-8">
					<h2 className="text-xl mb-4 border-b border-[#222] pb-2">
						$ ls -la ~/
					</h2>
					<ul className="space-y-4">
						{chunk.map((edge) => (
							<NewPostSummary
								key={edge.node.frontmatter.title}
								title={edge.node.frontmatter.title}
								path={edge.node.frontmatter.path}
								date={edge.node.frontmatter.date}
							/>
						))}
					</ul>
				</div>

				<div className="mt-12 pt-4 border-t border-[#222]">
					<h2 className="text-xl mb-4">$ whoami</h2>
					<p className="mb-4">
						Just another hacker exploring the digital frontier. This blog
						contains my notes, discoveries, and thoughts on programming,
						systems, and the evolving cyberspace.
					</p>
					<p>
						<Link to="/about" className="text-[#222] hover:underline">
							more ~/about.txt
						</Link>
					</p>
				</div>
			</main>
		</Layout>
	);
};

const IndexPage = (props: IndexPageProps) => {
	const { chunk, page } = props.pageContext;
	const prevLink =
		page === 2 ? (
			<Link to="/">Prev</Link>
		) : (
			<Link to={`/${page - 1}`}>Prev</Link>
		);
	return (
		<Layout>
			<SEO title="Home" />
			<div className="gap-16 lg:gap-32 grid grid-cols-1 md:grid-cols-3 auto-rows-auto">
				<section className="grid gap-8 col-span-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{chunk.map((edge) => (
						<PostSummary
							post={edge.node.frontmatter}
							timeToReadMinutes={edge.timeToReadMinutes}
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
	);
};

//export default IndexPage
export default NewHomepage;
