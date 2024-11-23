import { Carousel } from 'react-responsive-carousel';
import { useAppSelector } from '../../../hooks';

import { PopularItem, Title } from '../../Lib';

import { popularSizes } from './popularSizes';

export const PopularSizes = () => {
	const { lang } = useAppSelector(state => state.langReducer);

	const Item = ({x}: {x: number}) => {
		const radius = popularSizes[x].size;
		return <div>
			<div className='text-center text-lg font-bold mb-4'>R{radius}</div>
			{popularSizes[x].items.map((i, index) => {
				return <PopularItem
					key={index}
					label={ `${i.width}/${i.height} R${radius}` }
					link={ `?width=${i.width}&height=${i.height}&radius=${radius}` }/>
			})}
		</div>
	}

	const BlockItems = ({ x, y }: { x: number, y?: number }) => {
		return <div className='grid grid-cols-2 gap-x-2.5 mx-1'>
			<Item x={ x } />
			{ y && <Item x={ y } /> }
		</div>
	}

	return <div className='mt-28'>
		<Title title={lang === 'ua' ? 'Популярні розміри легкових шин' : 'Популярные размеры легковых шин'}/>
		<div className='lg:grid grid-cols-9 mt-12 gap-x-5 hidden'>
			{popularSizes.map(item => {
				return <div key={item.size}>
					<div className='text-center text-lg font-bold mb-4'>R{item.size}</div>
					{item.items.map((i, index) => {
						return <PopularItem
							key={ index }
							label={ `${i.width}/${i.height} R${item.size}` }
							link={ `?width=${i.width}&height=${i.height}&radius=${item.size}` }
						/>
					})}
				</div>
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
				<BlockItems x={ 0 } y={ 1 } />
				<BlockItems x={ 2 } y={ 3 } />
				<BlockItems x={ 4 } y={ 5 } />
				<BlockItems x={ 6 } y={ 7 } />
				<BlockItems x={ 8 } />
			</Carousel>
		</div>
	</div>
};
