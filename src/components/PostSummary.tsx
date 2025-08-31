import React from 'react'
import { Link } from 'gatsby'
import { format } from 'date-fns'

type PostSummaryProps = {
    post: {
        date: string | number
        description: string
        title: string
        path: string
        featureImg: {
            childImageSharp: {
                fluid?: {
                    base64: string
                    aspectRatio: number
                    src: string
                    srcSet: string
                    srcWebp: string
                    srcSetWebp: string
                    sizes: string
                }
                gatsbyImageData?: unknown
            }
        }
    }
    timeToReadMinutes: number
}

const toLocalPath = (path: string) => `~/posts/${path.replaceAll('/', '')}.mdx`

const PostSummary = ({ post, timeToReadMinutes }: PostSummaryProps) => {
    const { path, title, date } = post

    return (
        <div className="post-item">
            <div className="post-title">
                <Link className="post-link" to={path}>
                    {title}
                </Link>
            </div>
            <div className="terminal-command mb-1">
                cat {toLocalPath(path)}
            </div>
            <div className="post-meta">
                {format(new Date(date), 'MMM dd, yyyy')} • {timeToReadMinutes} min read
            </div>
        </div>
    )
}

export default PostSummary
