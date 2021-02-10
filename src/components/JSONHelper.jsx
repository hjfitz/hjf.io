import React from 'react'

const JSONHelper = ({json}) => {
	return (
		<div className="gatsby-highlight" data-language="json">
			<pre className="language-json">
				<code className="inline-block language-json">
					{JSON.stringify(json, null, 2)}
				</code>
			</pre>
		</div>
	)
}

export default JSONHelper
