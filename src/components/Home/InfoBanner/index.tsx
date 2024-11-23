import { FC } from 'react';
import styles from './index.module.scss';

import { Link } from '../../../lib';

interface InfoBannerProps {
	lang: string
}

export const InfoBanner: FC<InfoBannerProps> = ({ lang }) => {
	return <div className={styles['info-banner']}>
		<p className='text-lg md:text-xl text-white uppercase'>
			{ lang === 'ua' ? 'Гарантія якості. Доступні ціни' : 'Гарантия качества. Доступные цены' }
		</p>
		<ul className='mt-10 md:mt-16 ml-8 list-disc uppercase'>
			<li className='text-2xl md:text-4xl font-bold text-white'>
				{lang === 'ua' ? 'Літні шини' : 'Летние шины'}
			</li>
			<li className='mt-8 text-2xl md:text-4xl font-bold text-white'>
				{lang === 'ua' ? 'Зимові шини' : 'Зимние шины'}
			</li>
			<li className='mt-8 text-2xl md:text-4xl font-bold text-white'>
				{lang === 'ua' ? 'Всесезонні шини' : 'Всесезонные шины'}
			</li>
		</ul>
		<Link to='/catalog/tires/' className='btn secondary mt-16 w-full md:w-60'>
			{lang === 'ua' ? 'Купити зараз' : 'Купить сейчас'}
		</Link>
	</div>
}
