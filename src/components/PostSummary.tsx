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
    <div className="flex flex-col justify-center">
      <header>
        <h2>
          <Link className="text-2xl underline post-link " to={path}>
            {title}
          </Link>
        </h2>
      </header>
      <small className="text-gray-500">
        Committed on {format(new Date(date), "do MMM, yyyy")}
      </small>
      <p className="text-sm text-gray-800 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default PostSummary;
