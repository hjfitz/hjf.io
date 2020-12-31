import React from 'react'

const TwitterActivity = ({tweets}) => {
	return (
		<div>
			<span className="font-medium">Tweets </span>
			<span className="text-blue-600">Tweeted</span>
			<div>
				{tweets.map(tweet => {
					const hasImage = 'entities' in tweet && 'media' in tweet.entities && tweet.entities.media.length
					const img = hasImage && (
						<img src={`${tweet.entities.media[0].media_url_https}?name=thumb`} />
					)
					const span = hasImage ? 'col-span-2' : 'col-span-3'
					return (
						<div className="py-2" key={tweet.id}>
							<a
								href={`https://twitter.com/__hjf/status/${tweet.id_str}`}
								className="grid gap-4 grid-cols-1 md:grid-cols-3"
							>
								{img}
								<p className={`text-sm break-words ${span}`}>{tweet.text}</p>
							</a>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default TwitterActivity
