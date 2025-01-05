require('dotenv-flow').config()

const axios = require('axios')

const { TWITTER_BEARER_TOKEN: token } = process.env

const API_URL =
    'https://api.twitter.com/2/tweets/search/recent?query=from:__hjf'
const getTweetUrl = (id) =>
    `https://api.twitter.com/1.1/statuses/show/${id}.json`

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
}
async function getTwitterTweets() {
    try {
        const { data } = await axios.get(API_URL, config)

        return Promise.all(
            data.data
                .filter((tweet) => tweet.text.indexOf('@'))
                .slice(0, 5)
                .map(async (tweet) => {
                    const { data } = await axios.get(
                        getTweetUrl(tweet.id),
                        config
                    )
                    return data
                })
        )
    } catch (err) {
        console.error('==================')
        console.error('[ERROR ON TWITTER]')
        console.error('unable to fetch. error:')
        console.error(err)
        console.error('has token: ' + token)
        console.error('==================')
        return []
    }
}

module.exports = {
    getTwitterTweets,
}
