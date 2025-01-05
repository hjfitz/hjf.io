import { CreatePagesArgs } from 'gatsby'
import path from 'node:path'

const templatesDir = path.resolve(__dirname, 'src', 'templates')
const mdxTemplate = path.resolve(templatesDir, 'mdx.template.tsx')
const paginatedHomepageTemplate = path.resolve(
    templatesDir,
    'index.template.tsx'
)

export const createPages = async ({
    graphql,
    actions: { createPage },
}: CreatePagesArgs) => {
    const completeResult = await graphql(`
        query PagesQuery {
            allMdx {
                nodes {
                    id
                    frontmatter {
                        path
                        title
                        date
                        draft
                    }
                    internal {
                        contentFilePath
                    }
                }
            }
        }
    `)
    const posts = completeResult.data.allMdx.nodes

    // We'll call `createPage` for each result
    posts.forEach((node) => {
        if (node.frontmatter.draft) return

        console.log(`creating ${node.frontmatter.path}`)
        createPage({
            path: node.frontmatter.path,
            // This component will wrap our MDX content
            //component: mdxTemplate,
            component: `${mdxTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
            // We can use the values in this context in
            // our page layout component
            context: node,
        })
    })

    // create the blog pages - paginated
    const blogResult = await graphql(`
        query BlogContentQuery {
            allMdx(
                filter: {
                    frontmatter: { type: { eq: "blog" }, draft: { eq: false } }
                }
                sort: { frontmatter: { date: DESC } }
            ) {
                edges {
                    node {
                        id
                        frontmatter {
                            path
                            title
                            date
                            draft
                            description
                            featureImg {
                                childImageSharp {
                                    gatsbyImageData
                                }
                            }
                        }
                    }
                }
            }
        }
    `)

    const chunked = blogResult.data?.allMdx.edges.reduce((acc, cur, idx) => {
        if (idx % 10 === 0) acc.push([])
        acc[acc.length - 1].push(cur)
        return acc
    }, [])

    chunked.forEach((chunk, idx) => {
        const page = ++idx

        const path = page === 1 ? '/' : `/${page}`

        const pageParams = {
            path,
            context: { chunk, page },
            component: paginatedHomepageTemplate,
        }

        console.log(`creating blog page ${path}`)

        createPage(pageParams)
    })
}

export function onCreateNode({ node, actions: { createNodeField } }) {
    if (node.internal.type !== 'Mdx') return
    createNodeField({
        name: 'slug',
        value: node.frontmatter.path,
        node,
    })
}

export function onCreateWebpackConfig({ actions }) {
    actions.setWebpackConfig({ resolve: { fallback: { fs: false } } })
}
