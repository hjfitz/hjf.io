const {getTwitterTweets} = require('../src/build-tools/get-twitter-tweets')

exports.handler = async () => {
	const data = await getTwitterTweets()
	return {
		statusCode: 200,
		body: JSON.stringify(data),
	}
}
