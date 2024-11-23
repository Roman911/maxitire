export interface itemProps {
	full_name: string
	default_photo: number
	model: number
	group: number
	comments_count: number
	comments_avg_rate: number
	min_price: number
	max_price: number
	diameter: number
	best_offer: {
		id: number
		price: number
		city: number
		country: number
		year: number | null
	}
}
