export type TextForm = 'paragraph' | 'heading_1' | 'heading_2' | 'heading_3'

export interface Post {
    title: string
    coverUrl?: string
    mdContents: string
    createdAt: Date
}

export interface RichText {
    type: string
    text: {
        content: string
        link: string | null
    }
    annotations: {
        bold: boolean
        italic: boolean
        strikethrough: boolean
        underline: boolean
        code: boolean
        color: string
    }
    plain_text: string
    href: string | null
}

export interface Frontmatter {
    title: string
    date: string
    type: 'blog'
    draft: false
    path: string
    category: string
    tags: string[]
    description: string
    featureImg: string
}
