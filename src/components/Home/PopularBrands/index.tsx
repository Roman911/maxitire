import { Carousel } from 'react-responsive-carousel';

import { useAppSelector, useAppTranslation } from '../../../hooks';

import { Link } from '../../../lib';
import { PopularItem, Title } from '../../Lib';

import { popularBrands } from './popularBrands';

export const PopularBrands = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const t = useAppTranslation();

	const splitArrayIntoChunks = (arr: { label: string, link: string }[], chunkSize: number) => {
		const result = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			result.push(arr.slice(i, i + chunkSize));
		}
		return result;
	}

	return <div className='mt-24'>
		<Title title={lang === 'ua' ? 'Популярні марки авто' : 'Популярные марки авто'}/>
		<div className='lg:grid grid-cols-6 mt-12 gap-x-5 mb-8 hidden'>
			{popularBrands.map((i, index) => {
				return <PopularItem key={index} label={i.label} link={i.link}/>
			})}
		</div>
		<div className='lg:hidden'>
			<Carousel
				showArrows={true}
				autoPlay={true}
				infiniteLoop={true}
				interval={5000}
				showThumbs={false}
				showStatus={false}
				showIndicators={false}
			>
				{splitArrayIntoChunks(popularBrands, 10).map((item, index) => {
					return <div key={index} className='grid grid-cols-2 gap-x-2.5 mx-1'>
						{item.map((i, index) => {
							return <PopularItem key={index} label={i.label} link={i.link}/>
						})}
					</div>
				})}
			</Carousel>
		</div>
		<Link className='uppercase font-bold text-blue-500' to='/'>{t('show all')}</Link>
	</div>
}
