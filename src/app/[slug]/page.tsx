import { JSONOutput } from '@/components'
import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'node:fs/promises'
import path from 'node:path'

async function loadMdxFile(slug: string): Promise<string> {
		// go to mdx/
		// slug should be dir name
		// read page.mdx
		const filePath = path.join(process.cwd(), 'src/mdx', slug, 'page.mdx')
		return await fs.readFile(filePath, 'utf8')
}

interface Frontmatter {
		type: string
		date: Date
		draft: boolean
		// @deprecated
		path: string 
		category?: string
		tags: string[]
		description?: string
		featureImg?: string
}

function parseFrontmatter(mdx: string): Frontmatter {
		const matter = mdx.split('---')[1]
		const lines = matter.split('\n').filter(Boolean).map(line => line.trim())
		const frontmatter = {} as any
		for (const line of lines) {
				const [key, value] = line.split(':').map(str => str.trim()) as [string, string]
				if (key === 'date') {
						frontmatter[key] = new Date(value)
				} else {
						frontmatter[key] = value
				}
		}
		return frontmatter as Frontmatter

}

const Slug = async ({ params }: { params: { slug: string } }) => {
		const pageContent = await loadMdxFile(params.slug)
		const matter = parseFrontmatter(pageContent)
		return <MDXRemote source={pageContent} />
		return <JSONOutput obj={matter} />
		return <h1>hello {params.slug}</h1>;
}

export default Slug;
