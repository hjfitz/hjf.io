import Link from 'next/link';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

export function NavItem({ href, children }: NavItemProps) {
  return (
    <Link href={href}>
      <span className="mx-2 hover:text-blue-600">{children}</span>
    </Link>
  );
}
