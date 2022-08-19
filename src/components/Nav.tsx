import React from "react";
import { Link } from "gatsby";


const Nav = () => {
	return (
		<nav className="text-gray-800 inline-block">
			<Link className="mx-2 hover:text-blue-600" to="/">
				Home
			</Link>
			<Link className="mx-2 hover:text-blue-600" to="/about">
				About
			</Link>
			<Link className="mx-2 hover:text-blue-600" to="/blog">
				Blog
			</Link>
			<Link className="mx-2 hover:text-blue-600" to="/uses">
				/uses
			</Link>
		</nav>
	);
};

export default Nav;
