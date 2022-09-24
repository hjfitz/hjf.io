import axios, {AxiosInstance} from 'axios'

export class NotionHttpClient {
	constructor(
		private readonly client: AxiosInstance,
		private readonly databaseId: string,
	) {}

	async fetchPublishedPages() {
		const API_URL = `/databases/${this.databaseId}/query/`
		console.log(`Making request to "${API_URL}"`)
		const resp = await this.client.post(API_URL, {
			page_size: 50,
			filter: {
				property: 'State',
				select: {equals: 'Ready for Publish'},
			},
		})
		return resp.data?.results ?? []
	}

	async fetchPageContents(page: any) {
		const title = page.properties.Name.title[0].plain_text
		console.log(`fetching content for "${title}"`)
		const PAGE_CONTENTS_API_URL = `/blocks/${page.id}/children`
		const blocks = await this.client.get(PAGE_CONTENTS_API_URL)
		if (blocks.data.has_more) {
			throw new Error('unsupported paging')
		}
		return blocks.data
	}
}

export function getClient() {
	const DATABASE_URL = '73517948752b4912b8f4c613b9005a89'
	const notion = axios.create({
		baseURL: 'https://api.notion.com/v1/',
		headers: {
			authorization: `Bearer ${process.env.NOTION_API_KEY}`,
			accept: 'application/json',
			'Notion-Version': '2022-06-28',
			'content-type': 'application/json',
		},
	})
	return new NotionHttpClient(notion, DATABASE_URL)
}
