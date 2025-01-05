import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import format from 'date-fns/format'

interface Post {
    date: string | numer
    description: string
    title: string
    path: string
    featureImg: {
        childImageSharp: {
            fluid: unknown
        }
    }
}

interface PostSummaryProps {
    post: Post
}

function PostSummary({ post }: PostSummaryProps) {
    const { path, title, date, featureImg } = post

    return (
        <div className="flex justify-center my-2">
            <Link
                className="w-full hover:text-blue-500 transition ease-all"
                to={path}
            >
                <Img
                    className="h-64 mb-4"
                    fluid={featureImg.childImageSharp.fluid}
                />
                <header>
                    <h2 className="text-2xl font-semibold post-link font-header">
                        {title}
                    </h2>
                </header>
                <small className="text-gray-500">
                    {format(new Date(date), 'do MMM, yyyy')}
                </small>
                <p className="text-blue-500 hover:underline">Read More »</p>
            </Link>
        </div>
    )
}

export default PostSummary
