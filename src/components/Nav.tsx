import React from 'react'
import { GatsbyLinkProps, Link } from 'gatsby'

type NavItemProps = Pick<GatsbyLinkProps<unknown>, 'children' | 'to'>

type NavProps = {
    children: React.ReactNode
}

const NavItem = ({ to, children }: NavItemProps) => (
    <Link className="hover:text-blue-600 mr-4" to={to}>
        {children}
    </Link>
)

const Nav = ({ children }: NavProps) => (
    <nav className="text-gray-800 inline-block flex justify-center">
        {children}
        <NavItem to="/">Home</NavItem>
        <NavItem to="/about">About</NavItem>
        {/* <NavItem to="/blog">Blog</NavItem> */}
        <NavItem to="/uses">/uses</NavItem>
    </nav>
)

export default Nav
