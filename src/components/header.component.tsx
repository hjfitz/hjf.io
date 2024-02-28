import Link from "next/link";
import { navItems } from "./nav.computed.component";

export const Header = () =>  {
		return (
				<header>
						<section className="pt-4 pb-8 text-xl font-header">
								<header className="pb-1 text-yellow-500 inline-block mr-2">
									<Link href="/">hjf.io</Link>
								</header>
								<nav className="text-gray-800 inline-block">
										{navItems}
								</nav>
						</section>
				</header>
		)
}
