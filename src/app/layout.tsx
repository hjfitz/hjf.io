import { Container, Footer, Header } from "@/components";
import "./globals.scss";
import React from 'react';

type LayoutProps = Readonly<{
		children: React.ReactNode
}>

export const metadata = { 
		title: {
				default: "Harry's Code and Bugs",
				template: "%s | Harry's Code and Bugs",
		}
}

const RootLayout = async ({ children }: LayoutProps) => {
		return (
				<html lang="en">
					<body>
						<Container>
								<Header />
								{children}
								<Footer />
						</Container>
				</body>
				</html>
		);
}
 export default RootLayout
