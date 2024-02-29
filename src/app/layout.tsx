import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Container, Footer, Header, JSONOutput } from "@/components";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = Readonly<{
		children: React.ReactNode
		params: { slug: string }
		frontmatter: any
}>

const RootLayout = (props: LayoutProps) => {
const { children, frontmatter }: LayoutProps = props
  return (
    <html lang="en">
      <body className={inter.className}>
				<Container>
						<Header />
						<JSONOutput obj={frontmatter} />
					  {children}
					  <Footer />
				</Container>
	  </body>
    </html>
  );
}
 export default RootLayout
