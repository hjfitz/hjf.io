const axios = require('axios')

const apiUrl = 'https://api.github.com/users/hjfitz/events'

const allowedEvents = [
	'PushEvent',
	'CreateEvent',
	'ForkEvent',
]

const MAX_EVENTS = 5

// todo: potentially add some safety retries in the fetch
async function getGithubActivity() {
	console.log('Fetching Github activity...')
	const {data} = await axios.get(apiUrl)
	console.log('Gotten github activity')
	const allowedProps = data.filter(event => (
		allowedEvents.includes(event.type)
	))

	return allowedProps.slice(0, MAX_EVENTS)

	// todo: figure out fields we need to save on page size
	return allowedProps
}


module.exports = {
	getGithubActivity,
}
