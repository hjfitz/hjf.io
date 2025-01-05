import React, { useState, useEffect, useRef } from 'react'
import * as faceapi from 'face-api.js'

function useTiny() {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        faceapi.nets.tinyFaceDetector
            .load('/weights')
            .then(() => setLoaded(true))
    }, [])
    return loaded
}

export var FaceApiBoiler = function () {
    const video = useRef(null)
    const canvas = useRef(null)

    const [stream, setStream] = useState(null)

    const isLoaded = useTiny()

    useEffect(() => {
        if (!stream) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => setStream(stream))
        } else {
            const { current: vid } = video
            const { current: canv } = canvas
            vid.srcObject = stream
            vid.play()
            vid.addEventListener('playing', () => {
                const { height, width } = vid.getBoundingClientRect()
                canv.height = height
                canv.width = width
                const ctx = canv.getContext('2d')
                function displayFrame() {
                    if (vid.paused) return
                    ctx.drawImage(vid, 0, 0, width, height)
                    requestAnimationFrame(displayFrame)
                }
                requestAnimationFrame(displayFrame)
            })
        }
    }, [stream])

    return (
        <div>
            <p>Loaded: {isLoaded.toString()}</p>
            <video ref={video} />
            <canvas ref={canvas} />
        </div>
    )
}

export var FaceApiInit = function () {
    const video = useRef(null)
    const detecting = useRef(false)
    const frame = useRef(null)

    const [stream, setStream] = useState(null)
    const [curDetection, setDetection] = useState(null)
    const [allowDetection, setDetecting] = useState(false)

    const toggleDetection = (ev) => {
        ev.preventDefault()
        setDetecting((state) => !state)
    }

    // awful hack
    useEffect(() => {
        detecting.current = allowDetection
    }, [allowDetection])

    useEffect(() => {
        if (!curDetection) return
        const { current: fme } = frame
        const { current: vid } = video
        // move thingy
        const { _x, _y } = curDetection._box
        const { x, y } = vid.getBoundingClientRect()
        fme.style.left = `${_x + x}px`
        fme.style.top = `${_y + y}px`
    }, [curDetection])

    const isLoaded = useTiny()

    useEffect(() => {
        if (!stream) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => setStream(stream))
        } else {
            const { current: vid } = video
            vid.srcObject = stream
            vid.play()
            vid.addEventListener('playing', () => {
                setInterval(() => {
                    const canDetect = detecting.current
                    if (!canDetect) return
                    const opts = new faceapi.TinyFaceDetectorOptions()
                    const detection = faceapi
                        .detectSingleFace(vid, opts)
                        .then((detection) => {
                            if (!detection) return
                            const { width, height } =
                                vid.getBoundingClientRect()
                            const detectionsForSize = faceapi.resizeResults(
                                detection,
                                {
                                    height,
                                    width,
                                }
                            )
                            console.log(
                                JSON.stringify(
                                    { detection, detectionsForSize },
                                    null,
                                    2
                                )
                            )
                            setDetection(detectionsForSize)
                        })
                }, 1e3)
            })
        }
    }, [stream])

    return (
        <>
            <div className="grid grid-cols-12">
                <pre className="col-span-6 language-none">
                    <video className="" ref={video} />
                </pre>
                <pre className="my-0 col-span-6 language-javascript">
                    <code className="inline-block language-javascript">
                        {curDetection && JSON.stringify(curDetection, null, 2)}
                    </code>
                </pre>
            </div>
            <div className="my-4 text-center">
                <a
                    onClick={toggleDetection}
                    className="inline px-4 py-2 m-2 text-gray-700 bg-gray-700 border border-gray-700 cursor-pointer select-none rounded-md transition duration-500 ease hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                >
                    {allowDetection ? 'Stop detecting' : 'Start detecting'}
                </a>
            </div>
            {
                // curDetection &&
                <div
                    ref={frame}
                    style={{ position: 'fixed' }}
                    className="w-24 h-24 border-4"
                />
            }
        </>
    )
}

export var ShowElement = function ({ children }) {
    const [show, setShow] = useState(false)
    if (show) return children
    return (
        <div className="mt-2 text-center">
            <p
                onClick={() => setShow(true)}
                className="inline px-4 py-2 m-2 text-gray-700 bg-gray-700 border border-gray-700 cursor-pointer select-none rounded-md transition duration-500 ease hover:bg-gray-300 focus:outline-none focus:shadow-outline"
            >
                Show Video
            </p>
        </div>
    )
}
