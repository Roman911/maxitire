import { FC } from 'react';

import { CountryInfo, Quantity } from '../../Lib';
import { Link } from '../../../lib';

interface CartItemProps {
	id: number
	pageUrl: string
	quantity: number
	default_photo: string
	full_name: string
	price: string
	group: number
	country: string
	country_ru: string
	year: number
	offerQuantity: number,
	removeProduct: (id: number) => void
	setQuantity: (id: number, quantity: number) => void
}

export const CartItem: FC<CartItemProps> = (
	{
		id,
		pageUrl,
		quantity,
		default_photo,
		full_name,
		price,
		group,
		country,
		year,
		offerQuantity,
		setQuantity,
		removeProduct
	}) => {

	const onChange = (e: { target: HTMLInputElement }) => {
		const value = e.target.value;
		const onlyNumbers = value.replace(/\D/g, '');
		const numericValue = Number(onlyNumbers);

		setQuantity(id, numericValue < offerQuantity ? numericValue : offerQuantity);
	}

	return <div className='flex flex-col md:flex-row py-4 items-center relative'>
		<Link to={ `/${ pageUrl }` }>
			<img className='w-36' src={ default_photo } alt=""/>
		</Link>
		<div className='flex flex-col md:flex-row justify-between items-center w-full ml-4 pr-4 mt-4 md:mt-0 md:pr-0'>
			<div className='flex-1'>
				<Link to={ `/${ pageUrl }` } className='font-bold md:text-lg hover:text-blue-700 transition'>
					{ full_name }
				</Link>
				<div className='font-bold text-xl mt-2'>{ price } ₴/шт.</div>
				<div className='text-sm text-gray-500 mt-1'>Арт: { group }</div>
				<div className='country mt-2 md:col-span-4'>
					<CountryInfo
						country={ country }
						year={ year }
					/>
				</div>
			</div>
			<div className='flex flex-col items-end mt-6 md:mt-3 mr-4 gap-4'>
				<Quantity
					id={ id }
					price={ price }
					quantity={ quantity }
					offerQuantity={ offerQuantity }
					onChange={ onChange }
					setQuantity={ setQuantity }
				/>
			</div>
		</div>
		<button onClick={ () => removeProduct(id) } className='absolute top-4 right-0 md:right-3 p-2'>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-4 h-4 fill-gray-500'>
				<path
					d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
			</svg>
		</button>
	</div>
};
