import React, {useState} from 'react'
import {Link} from 'gatsby'

// nohome is an awful hack from a lazy harry #noharry
const Links = ({noHome}) => (
	<>
		{noHome || <Link to="/">Home</Link>}
		<Link to="/about">About</Link>
		<Link to="/blog">Blog</Link>
		<Link to="/uses">/uses</Link>
	</>
)

const Burger = () => (
	<svg className="inline pl-4" viewBox="0 0 100 80" width="40" height="40">
		<rect width="100" height="12"></rect>
		<rect y="30" width="100" height="12"></rect>
		<rect y="60" width="100" height="12"></rect>
	</svg>
)

const Nav = () => {
	const [hidden, setHidden] = useState(true)
	const toggleNav = () => setHidden(hidden => !hidden)
	return (
		<>
			<nav className="hidden text-4xl gap-4 sm:grid-cols-4 sm:grid">
				<Links />
			</nav>
			<nav className="items-center text-4xl sm:hidden gap-4 grid">
				<div className="mx-auto my-0 cursor-pointer" role="button" onClick={toggleNav}>
					<Link to="/">Home</Link>
					<Burger />
				</div>
				{hidden || <Links noHome />}
			</nav>
		</>
	)

}

export default Nav
