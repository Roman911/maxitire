import { Config } from './models/config';

export const config: Config = {
	domain: 'maxitire.com.ua',
	startYear: 2020,
	contacts: {
		passengerTires: [
			{
				logo: 'kievstar',
				phone: '+38 (067) 411 72 74',
				phoneUrl: '+380674117274',
				manager: 'Наталія'
			},
			{
				logo: 'vodafone',
				phone: '+38 (095) 434 96 92',
				phoneUrl: '+380954349692',
				manager: 'Михайло'
			}
		],
		truckTires: [
			{
				logo: 'kievstar',
				phone: '+38 (067) 411 73 77',
				phoneUrl: '+380674117377',
				manager: 'Андрій'
			},
			{
				logo: 'vodafone',
				phone: '+38 (050) 207 73 77',
				phoneUrl: '+380502077377',
				manager: 'Олег'
			}
		],
		tireRepair: [
			{
				logo: 'kievstar',
				phone: '+38 (067) 411 73 77',
				phoneUrl: '+380674117377',
			}
		]
	},
	social: {
		links: [
			{ link: 'https://t.me', logo: 'telegram' },
			{ link: 'https://www.facebook.com', logo: 'facebook' },
			{ link: 'https://www.instagram.com', logo: 'instagram' },
		],
	},
	catalog: {
		itemsProduct: 12
	},
	filterAlt: {
		submitFloatShowTime: 7000
	},
	deliveryCalculation: {
		postpaid: {
			const: 20,
			cof: 1.02
		}
	}
}
