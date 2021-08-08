import React, {useState} from 'react'
import {Link} from 'gatsby'

// nohome is an awful hack from a lazy harry #noharry
const Links = ({noHome}) => (
	<>
		{noHome || <Link to="/">Home</Link>}
		<Link className="mx-2" to="/about">About</Link>
		<Link className="mx-2" to="/blog">Blog</Link>
		<Link className="mx-2" to="/uses">/uses</Link>
	</>
)

const Burger = () => (
	<svg className="inline pl-4" viewBox="0 0 100 80" width="40" height="40">
		<rect width="100" height="12" />
		<rect y="30" width="100" height="12" />
		<rect y="60" width="100" height="12" />
	</svg>
)

const Nav = () => {
	const [hidden, setHidden] = useState(true)
	const toggleNav = () => setHidden((hidden) => !hidden)
	return (
		<>
			{/* deskop */}
			<nav className="hidden text-xl text-gray-800 sm:flex">
				<Links />
			</nav>

			{/* mobile */}
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
