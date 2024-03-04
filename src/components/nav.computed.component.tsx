import { NavItem } from './nav-item.component';

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/uses', label: '/uses' },
].map(({ href, label }) => (
  <NavItem href={href} key={href}>
    {label}
  </NavItem>
));
