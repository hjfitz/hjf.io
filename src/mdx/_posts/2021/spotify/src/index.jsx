/* eslint-disable react-hooks/rules-of-hooks, no-restricted-globals */
import React, { useEffect, useState } from 'react'

import PopularTracks from './PopularTracks'
import PopularArtists from './PopularArtists'
import { loginUrl, makeSpotifyRequest } from './spotify'
import { titleify } from './util'

const App = () => {
    if (typeof window === 'undefined') return ''
    // get our token response, check if it's valid
    const resp = JSON.parse(localStorage.getItem('tokenResponse'))
    let isValid = false
    if (resp && resp.expires) {
        const { expires } = resp
        isValid = new Date(expires) > new Date()
    }
    const tokenState = isValid ? resp : null

    if (!isValid) localStorage.clear()
    const [token, setToken] = useState(tokenState)

    const [data, setData] = useState(null)
    const [playing, setPlaying] = useState(null)

    const termLookup = { short_term: '4 Weeks', long_term: 'All Time' }
    const terms = Object.keys(termLookup)

    const [term, setCurrentTerm] = useState(terms[0])
    const [type, setCurentType] = useState('tracks')

    const setType = (type) => () => setCurentType(type)
    const setTerm = (term) => () => setCurrentTerm(term)

    useEffect(() => {
        const { hash } = window.location
        if (!hash) return

        const response = hash
            .substring(1)
            .split('&')
            .reduce((acc, cur) => {
                const [key, val] = cur.split('=')
                if (!(key in acc)) acc[key] = val
                return acc
            }, {})

        if ('error' in response) {
            console.log('there was an error!')
            return
        }

        if (!('access_token' in response)) {
            console.error('No access token found!')
            return
        }

        const now = new Date()
        now.setSeconds(now.getSeconds() + parseInt(response.expires_in, 10))
        response.expires = now.toString()

        localStorage.setItem('tokenResponse', JSON.stringify(response))

        setToken(response)
        // todo: remove window hash
        history.pushState('', document.title, window.location.pathname)
    }, [])

    async function getUserData() {
        const { access_token } = token
        const self = await makeSpotifyRequest('/me', access_token)
        const types = ['tracks', 'artists']

        const data = await Promise.all(
            types.map(async (type) => {
                const resp = await Promise.all(
                    terms.map(async (term) => ({
                        term,
                        data: await makeSpotifyRequest(
                            `/me/top/${type}?limit=10&time_range=${term}`,
                            access_token
                        ),
                    }))
                )

                const topData = resp.reduce((acc, cur) => {
                    acc[cur.term] = cur.data
                    return acc
                }, {})
                return { type, data: topData }
            })
        )

        const topMusic = data.reduce((acc, cur) => {
            acc[cur.type] = cur.data
            return acc
        }, {})

        setData({ self, top: topMusic })
    }

    async function fetchNowplaying() {
        const playingResp = await makeSpotifyRequest(
            '/me/player/currently-playing',
            token.access_token
        )
        if (!playingResp) {
            console.info('unable to parse nowplaying data')
            setPlaying(null)
            return
        }
        const { images } = playingResp.item.album
        const { length, [length - 1]: cover } = images
        setPlaying({
            track: playingResp.item.name,
            artist: playingResp.item.artists.map((a) => a.name).join(', '),
            album: playingResp.item.album.name,
            art: cover.url,
        })
    }

    async function playTrack(uri) {
        return makeSpotifyRequest(
            '/me/player/play',
            token.access_token,
            'PUT',
            { uris: [uri] }
        )
    }

    function playArtist(uri) {
        return makeSpotifyRequest(
            '/me/player/play',
            token.access_token,
            'PUT',
            { context_uri: uri }
        )
    }

    useEffect(() => {
        if (!token || data) return
        getUserData()
        fetchNowplaying()
        setInterval(fetchNowplaying, 10e3)
    }, [token])

    if (!token) {
        return (
            <div>
                <h1 className="text-center mt-4">
                    <a
                        href={loginUrl}
                        className="border border-indigo-500 text-indigo-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                    >
                        Click here to login and view spotify stats
                    </a>
                </h1>
            </div>
        )
    }

    const active = 'text-white bg-blue-600'

    if (!data) return <div>Loading data</div>

    return (
        <main className="container mx-auto">
            <header className="flex flex-row flex-wrap pt-2">
                <span className="mr-4">
                    <strong className="font-semibold">User:</strong>{' '}
                    {data.self.display_name} ({data.self.id})
                </span>
                {playing ? (
                    <span className="mr-4">
                        <strong className="font-semibold">Now Playing: </strong>
                        {playing.artist} -{playing.track} ({playing.album}
                        )
                        <img
                            className="inline h-6 max-h-full ml-2"
                            src={playing.art}
                            alt="now playing"
                        />
                    </span>
                ) : (
                    <span className="mr-4">
                        <strong className="font-semibold">Now Playing: </strong>{' '}
                        [No data]
                    </span>
                )}
            </header>
            <section>
                <div className="flex flex-col justify-around my-4 md:flex-row">
                    <div>
                        <h2 className="py-2 text-lg text-center">Type</h2>
                        <div className="flex flex-wrap items-center justify-center">
                            <button
                                className={`px-6 py-2 bg-blue-300 m-2 sm:my-0 rounded-md hover:bg-blue-500 ${type === 'artists' && active}`}
                                onClick={setType('artists')}
                            >
                                Artists
                            </button>
                            <button
                                className={`px-6 py-2 bg-blue-300 m-2 sm:my-0 rounded-md hover:bg-blue-500 ${type === 'tracks' && active}`}
                                onClick={setType('tracks')}
                            >
                                Tracks
                            </button>
                        </div>
                    </div>
                    <div>
                        <h2 className="py-2 text-lg text-center">Term</h2>
                        <div className="flex flex-wrap items-center justify-center">
                            {Object.entries(termLookup).map(([termL, desc]) => (
                                <button
                                    className={`px-6 py-2 bg-blue-300 rounded-md hover:bg-blue-500 m-2 sm:my-0 ${term === termL && active}`}
                                    key={termL}
                                    onClick={setTerm(termL)}
                                >
                                    {titleify(termL)} ({desc})
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:ml-8">
                    {type === 'artists' ? (
                        <PopularArtists
                            playArtist={playArtist}
                            artists={data.top[type][term].items}
                        />
                    ) : (
                        <PopularTracks
                            playTrack={playTrack}
                            tracks={data.top[type][term].items}
                        />
                    )}
                </div>
            </section>
        </main>
    )
}

export default App
