import React, {useState} from 'react'
import {Link} from 'gatsby'

// nohome is an awful hack from a lazy harry #noharry
const Links = ({noHome}) => (
	<>
		{noHome || <Link to="/">Home</Link>}
		<Link className="mx-2" to="/about">
			About
		</Link>
		<Link className="mx-2" to="/blog">
			Blog
		</Link>
		<Link className="mx-2" to="/uses">
			/uses
		</Link>
	</>
)

const Burger = () => (
	<svg className="inline pr-2" viewBox="0 0 100 80" width="30" height="30">
		<rect width="100" height="12" />
		<rect y="30" width="100" height="12" />
		<rect y="60" width="100" height="12" />
	</svg>
)

const Nav = () => {
	const [hidden, setHidden] = useState(true)
	const toggleNav = () => setHidden((h) => !h)
	return (
		<>
			{/* deskop */}
			<nav className="hidden text-xl text-gray-800 dark:text-gray-300 sm:flex">
				<Links />
			</nav>

			{/* mobile */}
			<nav className="text-xl sm:hidden gap-4 grid">
				<div className="my-0 cursor-pointer" role="button" onClick={toggleNav}>
					<Burger />
					<Link to="/">Home</Link>
				</div>
				{hidden || <Links noHome />}
			</nav>
		</>
	)
}

export default Nav
