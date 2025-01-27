export type IndexPageProps = {
    path: string
    location: {
        pathname: string
        search: string
        hash: string
        href: string
        origin: string
        protocol: string
        host: string
        hostname: string
        port: string
        state: unknown
        key: string
    }
    pageResources: {
        component: unknown
        head: unknown
        json: {
            pageContext: {
                chunk: Array<{
                    node: {
                        id: string
                        timeToReadMinutes: number
                        frontmatter: {
                            path: string
                            title: string
                            date: string
                            draft: boolean
                            description: string
                            featureImg: {
                                childImageSharp: {
                                    fluid: {
                                        base64: string
                                        aspectRatio: number
                                        src: string
                                        srcSet: string
                                        srcWebp: string
                                        srcSetWebp: string
                                        sizes: string
                                    }
                                }
                            }
                        }
                    }
                }>
                page: number
            }
            serverData: unknown
        }
        page: {
            componentChunkName: string
            path: string
            webpackCompilationHash: string
            staticQueryHashes: Array<string>
        }
    }
    uri: string
    pageContext: {
        chunk: Array<{
            node: {
                id: string
                timeToReadMinutes: number
                frontmatter: {
                    path: string
                    title: string
                    date: string
                    draft: boolean
                    description: string
                    featureImg: {
                        childImageSharp: {
                            fluid: {
                                base64: string
                                aspectRatio: number
                                src: string
                                srcSet: string
                                srcWebp: string
                                srcSetWebp: string
                                sizes: string
                            }
                        }
                    }
                }
            }
        }>
        page: number
    }
    serverData: any
    params: {}
}
