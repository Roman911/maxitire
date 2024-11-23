import { FC, MouseEvent } from 'react';

import type { Product } from '../../../models/products';
import { Link } from '../../../lib';
import { useAppTranslation } from '../../../hooks';
import { CloseButton } from '../../Lib';
import { Characteristics } from '../Characteristics';
import { CartIcon } from '../../Lib/Icons';

interface ItemWrapperProps {
	characteristics: Product[]
	tab: string
	name: 'tires' | 'cargo' | 'disks' | 'battery'
	handleClick: (id: number) => void
	onClick: (offerId: number, section: string) => void
	params: string[]
}

export const ItemWrapper: FC<ItemWrapperProps> = (
	{
		characteristics,
		name,
		tab,
		handleClick,
		onClick,
		params
	}) => {
	const t = useAppTranslation();

	const removeClick = (event: MouseEvent<HTMLDivElement | HTMLButtonElement>, id: number) => {
		event.preventDefault();
		handleClick(id);
	}

	return characteristics.map((item) => {
		return <div key={item.group}>
			<div className='w-60 relative m-1 min-h-60 bg-white'>
				<Link to={`/${item.page_url}`}>
					<CloseButton handleClick={(event) => removeClick(event, item.product_id)} />
					<img src={item.default_photo} alt=""/>
					<div
						className='absolute bottom-0 px-2 text-center bg-gray-500 rounded-sm h-20 flex items-center justify-center w-full whitespace-normal'>
						<p className='text-white text-center font-bold'>
							{ item.full_name }
						</p>
					</div>
				</Link>
			</div>
			<div className='divide-y divide-[#D0D4D9] text-center'>
				<Characteristics name={ name } item={ item } params={ params } />
				<div className='pt-8 pb-14'>
					<Link to={ `/cart` } onClick={() => onClick(item.best_offer.id, tab)} className='btn primary uppercase w-full md:w-52 mx-auto'>
						<CartIcon className='stroke-white'/>
						<span className='ml-2.5'>{ t('buy') }</span>
					</Link>
				</div>
			</div>
		</div>
	})
};
