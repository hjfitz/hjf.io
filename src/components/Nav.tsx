import React from 'react'
import { Link } from 'gatsby'

function NavItem({ to, children }) {
    return (
        <Link className="hover:text-blue-600 mr-4" to={to}>
            {children}
        </Link>
    )
}

function Nav({ children }) {
    return (
        <nav className="text-gray-800 inline-block flex">
            {children}
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About</NavItem>
            {/* <NavItem to="/blog">Blog</NavItem> */}
            <NavItem to="/uses">/uses</NavItem>
        </nav>
    )
}

export default Nav
