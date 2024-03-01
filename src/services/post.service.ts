import path from 'node:path'
import fs from 'node:fs/promises'

interface PostMetadata {
		title: string
		description: string
		date: Date
		tags: string[]
}

export async function getPostMetadata(pathname: string): Promise<null | PostMetadata> {
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
