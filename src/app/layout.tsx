import fs from 'node:fs/promises'
import path from 'node:path'
import { headers } from "next/headers";

import { Container, Footer, Header, PostHeader } from "@/components";
import "./globals.scss";


type LayoutProps = Readonly<{
		children: React.ReactNode
}>

export const metadata = { 
		title: {
				default: "Harry's Code and Bugs",
				template: "%s | Harry's Code and Bugs",
		}
}

interface PostMetadata {
		title: string
		description: string
		date: Date
		tags: string[]
}

async function getPostMetadata(pathname: string): Promise<null | PostMetadata> {
		const filePath = path.join(process.cwd(), 'src/app', pathname, 'page.mdx')
		const file = await fs.readFile(filePath, 'utf8')

		const lines = file.split('\n')

		const exportConstLine = lines.find(line => line.includes('export const'))
		if (!exportConstLine) {
				return null
		}
		
		const exportIdx = lines.indexOf(exportConstLine)
		let acc = ''
		for (let i = exportIdx; i < lines.length; i++) {
				const line = lines[i]
				acc += line
				if (line.startsWith('}')) {
						break
				}
		}

		// naughty
		let postMeta = ''
		acc = acc.replace('export const metadata', 'postMeta')
		eval(acc)

		return postMeta as unknown as PostMetadata
}

const RootLayout = async ({ children }: LayoutProps) => {
		const allHeaders = headers()
		const pathname = allHeaders.get('x-pathname')
		const postMeta = await getPostMetadata(pathname!)
		return (
				<html lang="en">
					<body>
						<Container>
								<Header />
										{postMeta ? (
												<PostHeader 
														title={postMeta.title} 
														date={postMeta.date}
												/>) : null}
								{children}
								<Footer />
						</Container>
				</body>
				</html>
		);
}
 export default RootLayout
