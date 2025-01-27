import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

function getPrompt(currentUrl: string, previousUrls: string[]): string {
    const history = previousUrls.join(', ')

    return `
Generate a cohesive approximation of a webpage for the given URL, ${currentUrl}, as a single HTML document. The document should adhere to the following constraints:

- HTML structure: Provide a complete, semantically valid HTML document, including tags like <header>, <main>, and <footer> as appropriate.
- Styles: Styles should ONLY be added via the style attribute to define the appearance of the page. CSS may not be used.
- JavaScript: Include any interactive functionality in <script> tags. All <a> tags should call window.generateNewPage(linkUrl) instead of navigating, where linkUrl is the value of the href attribute.
- Images: Use base64-encoded data URIs for all images and embed them directly into the HTML. Ensure to use only small images.
- Cohesion: Ensure the content is plausible, visually appealing, and consistent with the provided URL and history.
- History context: Use the "history" of previously visited URLs, ${history}, to inform the design and content of the page. For example:
- Maintain visual or thematic consistency with previously visited pages from the same domain.
- Reflect thematic connections suggested by the browsing history.
- No references: The content must not make any reference to being generated or acknowledge the generative process.
- Websites should contain content and not just the outline of the document. For example news websites should contain news, forums posts and so on.

Output the entire result as a single HTML document containing only HTML and JavaScript. Do not include any markdown tags in your response. Do not wrap your response in markdown.
`
}

export const DeadInternet = () => {
    const apiKeyRef = useRef<HTMLInputElement>(null)
    const [gemini, setGemini] = useState<GoogleGenerativeAI>()
    const [currentUrl, setCurrentUrl] = useState('')
    const [history, setHistory] = useState<string[]>([])

    const [generatedHTML, setGeneratedHTML] = useState('')

    const urlKeyUpHandler = (ev: KeyboardEvent<HTMLInputElement>) => {
        if (ev.key === 'Enter') {
            setCurrentUrl(ev.currentTarget.value)
        }
    }

    if (typeof window !== 'undefined') {
        // @ts-expect-error hacking with generated html
        window.generateNewPage = (url) => {
            setCurrentUrl(url)
        }
    }

    useEffect(() => {
        if (!gemini) {
            console.error('No API Key!')
            return
        }
        if (
            !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(:\d+)?(\/[^\s]*)?$/.test(
                currentUrl
            )
        ) {
            console.warn('Invalid URL: ' + currentUrl)
        }
        // get the prompt
        const prompt = getPrompt(currentUrl, history)
        // clear state and push in to history
        setHistory((hist) => [...hist, currentUrl])
        // generate the html and update state
        async function generate(geminiInstance: GoogleGenerativeAI) {
            const model = geminiInstance.getGenerativeModel({
                model: 'gemini-1.5-flash',
            })
            console.log('generating...')
            const result = await model.generateContent(prompt)
            setGeneratedHTML(result.response.text())
        }
        generate(gemini)
    }, [currentUrl])

    const apiKeyBlurHandler = () => {
        console.log('handling api key blur')
        if (!apiKeyRef.current) {
            return
        }

        const apiKey = apiKeyRef.current.value
        setGemini(new GoogleGenerativeAI(apiKey))
    }

    return (
        <section>
            <div>
                <input
                    type="text"
                    ref={apiKeyRef}
                    onBlur={apiKeyBlurHandler}
                    className="border"
                    value=""
                />
            </div>
            <div>
                <input
                    type="text"
                    onKeyUp={urlKeyUpHandler}
                    className="border"
                />
            </div>
            <div dangerouslySetInnerHTML={{ __html: generatedHTML }} />
        </section>
    )
}
