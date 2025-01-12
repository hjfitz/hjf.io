import axios from 'axios'
import YAML from 'yaml'
import { randomUUID } from 'crypto'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { extension } from 'mime-types'
import { mkdir, rm, writeFile } from 'fs/promises'
import { join } from 'path'
import { Frontmatter, RichText, TextForm } from './types'

const GENERATED_POST_ROOT = join(
    __dirname,
    '../../src/mdx/_posts',
    new Date().getFullYear().toString()
)

const tokenLookup = {
    paragraph: '',
    heading_1: '# ',
    heading_2: '## ',
    heading_3: '### ',
    bulleted_list_item: '- ',
    numbered_list_item: '1. ',
}

export default class NotionPage {
    private readonly pageContents: any

    private readonly pageMeta: any

    constructor(pageContents: any, pageMeta: any) {
        this.pageContents = pageContents
        this.pageMeta = pageMeta
    }

    private get title(): string {
        return this.pageMeta.properties.Name.title[0].text.content
    }

    private get slug(): string {
        return this.title
            .replace(/[^\w-]+/g, ' ')
            .trim()
            .replace(/ /g, '-')
            .toLowerCase()
    }

    private get root(): string {
        if (!existsSync(GENERATED_POST_ROOT)) {
            mkdirSync(GENERATED_POST_ROOT) // handle new years
        }
        return join(GENERATED_POST_ROOT, this.slug)
    }

    // todo: parsers should be of their own class
    private static parseRichText(text: RichText[]): string {
        return text
            .map((t) => {
                let surroundings = ''
                const raw = t.text.content
                if (t.annotations.bold) {
                    surroundings += '**'
                }
                if (t.annotations.code) {
                    surroundings += '`'
                }
                if (t.annotations.strikethrough) {
                    surroundings += '~'
                }
                if (t.annotations.underline) {
                    surroundings += '_'
                }
                if (t.annotations.italic) {
                    surroundings += '*'
                }
                return surroundings + raw + surroundings
            })
            .join('')
    }

    public parseBlocks() {
        const blocks = this.pageContents.results.map(async (block: any) => {
            switch (block.type) {
                case 'heading_1':
                case 'heading_2':
                case 'heading_3':
                case 'numbered_list_item':
                case 'bulleted_list_item':
                case 'paragraph': {
                    const blockType = block.type as TextForm
                    const mdToken = tokenLookup[blockType]
                    const content = NotionPage.parseRichText(
                        block[blockType].rich_text
                    )

                    return `${mdToken}${content}`
                }
                case 'code': {
                    return `\`\`\`${block.code.language}\n${block.code.rich_text[0].text.content}\n\`\`\``
                }
                case 'image': {
                    // todo: fetch and save
                    const src = await this.resolveImage(block.image.file.url)
                    return `![](./${src})`
                }
                case 'divider': {
                    return '---'
                }
                default: {
                    return ''
                }
            }
        })
        return Promise.all(blocks)
    }

    public async resolveImage(url: string, src?: string): Promise<string> {
        const resp = await axios.get(url, { responseType: 'arraybuffer' })

        const {
            data: rawImg,
            headers: { 'content-type': contentType },
        } = resp

        const ext = extension(contentType) ?? 'png'
        const filename = src ?? randomUUID()
        const imgSrc = `${filename}.${ext}`
        const imgLocation = join(this.root, imgSrc)

        await new Promise((res) =>
            createWriteStream(imgLocation).write(rawImg, res)
        )
        return imgSrc
    }

    public async createPage() {
        // todo: should probably not generate if exists
        console.log(`Attempting to create "${this.root}"`)
        // check if exists
        if (existsSync(this.root)) {
            // instead, unlink and rewrite because lazy
            console.log('dir exists. skipping')
            await rm(this.root, { force: true, recursive: true })
        }
        await mkdir(this.root)
        // const contents = await this.parseBlocks()

        // fetch cover image
        const featureSrc = await this.resolveImage(
            this.pageMeta.cover.external.url,
            'feature'
        )
        const postDescription = this.pageMeta.properties.Description.rich_text
            .map((p: any) => p.text.content)
            .join('')

        // generate frontmatter
        const frontMatter: Frontmatter = {
            title: this.title,
            date: new Date().toISOString(),
            type: 'blog',
            draft: false,
            path: `/${this.slug}/`,
            category: '',
            tags: [],
            description: postDescription,
            featureImg: featureSrc,
        }

        const frontmatter = YAML.stringify(frontMatter)

        // fetch contents
        const contents = await this.parseBlocks()
        const fullContents = `---\n${frontmatter}\n---\n\n${contents.join('\n\n')}`

        // write file
        const pageRoot = join(this.root, 'index.mdx')
        await writeFile(pageRoot, fullContents)
    }
}
