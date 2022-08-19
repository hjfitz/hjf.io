import React from "react";
import { Link } from "gatsby";
import format from "date-fns/format";

interface Post {
	date: string;
	description: string;
	title: string;
	path: string;
}

interface PostSummaryProps {
	post: Post;
}

const PostSummary = ({ post }: PostSummaryProps) => {
	const { path, title, description, date } = post;
	return (
		<div className="flex flex-col justify-center my-2">
			<Link className="" to={path}>
				<header>
					<h2 className="text-2xl font-semibold post-link font-header hover:text-blue-900">
						{title}
					</h2>
				</header>
				<small className="text-gray-500">
					Committed on {format(new Date(date), "do MMM, yyyy")}
				</small>
				<p className="text-sm text-gray-800 font-print">{description}</p>
			</Link>
		</div>
	);
};

export default PostSummary;
