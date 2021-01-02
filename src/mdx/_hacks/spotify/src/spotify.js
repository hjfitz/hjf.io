// this works, but destructuring from process.env does not
// wat fak
const clientID = 'efa2e8346fbd43c9b4af593547df03c8'
const redirectURI = process.env.GATSBY_SPOTIFY_REDIRECT_URI
const scopesRaw = [
	'user-top-read',
	'user-read-email',
	'user-read-private',
	'user-read-playback-state',
	'user-read-recently-played',
	'user-modify-playback-state',
	'user-read-currently-playing',
]

const scopes = encodeURIComponent(scopesRaw.join(' '))


// todo: add a state and validate
export const loginUrl = 'https://accounts.spotify.com/authorize'
	+ `?client_id=${clientID}`
	+ `&response_type=token`
	+ `&redirect_uri=${redirectURI}`
	+ `&scope=${scopes}`

export function makeSpotifyRequest(endpoint, token, method = 'GET', body = {}) {
	const url = `https://api.spotify.com/v1${endpoint}`
	const requestInit = {
		method,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	if (method !== 'GET') {
		requestInit.headers['content-type'] = 'application/json'
		requestInit.body = JSON.stringify(body)
	}

	console.log({requestInit})

	return fetch(url, requestInit).then(r => r.json())
}


