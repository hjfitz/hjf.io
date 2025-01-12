import { AxiosError } from 'axios'
import dotenv from 'dotenv-flow'
import { getClient } from './http'
import NotionPage from './scraper'

dotenv.config()

async function main() {
    const notionClient = getClient()
    try {
        const pages = await notionClient.fetchPublishedPages()
        for (const page of pages) {
            const pageContent = await notionClient.fetchPageContents(page)
            const notionPage = new NotionPage(pageContent, page)
            await notionPage.createPage()
        }
    } catch (err) {
        if (err instanceof AxiosError) {
            console.log('axios error caught')
            console.log(err.response?.data)
            console.log(err.message)
        } else if (err instanceof Error) {
            console.log('generic error caught')
            console.log(err.message)
            console.log(err.stack)
        } else {
            console.log('non-error thrown!')
            console.log(err)
        }
    }
}

void main()
