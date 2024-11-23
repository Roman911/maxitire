interface DescriptionsItem {
	title: string
}

interface Descriptions {
	ua: DescriptionsItem
	ru: DescriptionsItem
}

export interface AliasItem {
	article_id: number
	status: number
	slug: string
	created_at: string
	updated_at: string
	sort_header: number
	sort_footer: number
	header: number
	footer: number
	descriptions: Descriptions
}

export interface AliasAll {
	footer: AliasItem[]
	header: AliasItem[]
}
