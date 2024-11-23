export type PhoneLogo = 'vodafone' | 'kievstar';

interface SocialItem {
	link: string
	logo: string
}

interface ContactsItem {
	logo: PhoneLogo
	phone: string
	phoneUrl: string
	manager?: string
}

export interface Config {
	domain: string
	startYear: number
	contacts: {
		passengerTires: ContactsItem[]
		truckTires: ContactsItem[]
		tireRepair: ContactsItem[]
	}
	social: {
		links: SocialItem[]
	}
	catalog: {
		itemsProduct: number
	}
	filterAlt: {
		submitFloatShowTime: number
	}
	deliveryCalculation: {
		postpaid: {
			const: number
			cof: number
		}
	}
}
