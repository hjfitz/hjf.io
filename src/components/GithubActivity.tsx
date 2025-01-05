import React from 'react'

const eventLookup = {
    ForkEvent: 'Forked',
    PushEvent: 'Pushed to',
    CreateEvent: 'Created',
}

const getGitUrl = (repo: string) => `https://github.com/${repo}`

interface Event {
    id: string
    repo: {
        name: string
    }
    type: string
    payload: {
        commits: Array<{ message: string }>
    }
}

interface EventProps {
    event: Event
}

interface ActivityProps {
    events: Array<Event>
}

const GithubEvent = ({ event }: EventProps) => (
    <div className="py-2 text-sm">
        <a href={getGitUrl(event.repo.name)}>
            <span className="font-medium">{eventLookup[event.type]} </span>
            <span>{event.repo.name}</span>
            {event.type === 'PushEvent' && (
                <div className="text-xs">
                    Commit: {event.payload.commits[0].message}
                </div>
            )}
        </a>
    </div>
)

const ColourfulDiv = () => (
    <span>
        <span className="text-yellow-500">&lt;</span>
        <span className="italic text-gray-500">div</span>
        <span className="text-yellow-500"> /&gt;</span>s
    </span>
)

const GithubActivity = ({ events }: ActivityProps) => (
    <div className="mx-auto md:mx-0">
        <h1 className="text-lg">
            <ColourfulDiv /> slung
        </h1>
        <div>
            {events.slice(0, 5).map((event) => (
                <GithubEvent event={event} key={event.id} />
            ))}
        </div>
    </div>
)

export default GithubActivity
