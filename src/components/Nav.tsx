import React from 'react'
import { GatsbyLinkProps, Link } from 'gatsby'

type NavItemProps = Pick<GatsbyLinkProps<unknown>, 'children' | 'to'>

type NavProps = {
    children: React.ReactNode
}

const NavItem = ({ to, children }: NavItemProps) => (
    <Link className="nav-link" to={to}>
        {children}
    </Link>
)

const Nav = ({ children }: NavProps) => (
    <nav className="flex items-center">
        {children}
        <NavItem to="/">> home</NavItem>
        <NavItem to="/about">> about</NavItem>
        <NavItem to="/uses">> /uses</NavItem>
    </nav>
)

export default Nav
