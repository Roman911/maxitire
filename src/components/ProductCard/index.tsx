import { FC, MouseEvent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import style from './index.module.scss';
import { addToStorage, getFromStorage, Link, VehicleTypeTransform } from '../../lib';
import { useAppDispatch, useAppSelector, useAppTranslation } from '../../hooks';
import { addCart } from '../../store/reducers/cartSlice';
import { Language } from '../../models/language';
import { CountryInfo } from '../Lib';
import type { Product } from '../../models/products';
import { Section } from '../../models/filter';

import noPhoto from '../../assets/no-photo.webp';
import noPhotoRu from '../../assets/no-photo-ru.webp';

const cargo = ['3','4','5','6','9','10','11'];

interface ProductCardProps {
	item: Product
	isBookmarks: boolean
	addToDefense: (event: MouseEvent<HTMLButtonElement>, id: number) => void
}

export const ProductCardComponent: FC<ProductCardProps> = ({ item, isBookmarks, addToDefense }) => {
	const navigate = useNavigate();
	const t = useAppTranslation();
	const dispatch = useAppDispatch();
	const { best_offer, default_photo, full_name, group, min_price, season, vehicle_type, page_url } = item;
	const { lang } = useAppSelector(state => state.langReducer);
	const cartStorage = useMemo(() => getFromStorage('reducerCart'), []);
	const section = item.vehicle_type ? Section.Tires : item.diameter ? Section.Disks : Section.Battery;
	const sectionNew = section === Section.Tires ? cargo.includes(item.vehicle_type) ? 'cargo' : 'tires' : section;

	const seasonIcon = season === '1' ? 'sun' : season === '2' ? 'snow' : season === '3' ? 'all-season' : undefined;
	const vehicleTransform = vehicle_type ? VehicleTypeTransform(vehicle_type) : undefined;

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if(!cartStorage?.find((item: { id: number, quantity: number }) => item.id === best_offer.id)) {
			const cart = [ ...cartStorage, { id: best_offer.id, section: sectionNew, quantity: 1 }];
			dispatch(addCart({ id: best_offer.id, quantity: 1, section: sectionNew }));
			addToStorage('reducerCart', cart);
		}
		navigate( lang === Language.UA ?'/cart' : '/ru/cart');
	}

	return (
		<Link to={`/${page_url}`} className={twMerge(style['product-card'], 'group border border-gray-100 rounded-md text-center')}>
			<div className='relative min-h-72 sm:min-h-52'>
				<div className='absolute'>

				</div>
				<div className='absolute right-0 flex flex-col gap-2'>
					<button
						className={ twMerge('hover:text-blue-500', isBookmarks && 'text-blue-500') }
						onClick={event => addToDefense(event, group)}
					>
						{ isBookmarks ? <i className="icon iconfont-heart"></i> : <i className="icon iconfont-heart-o"></i> }
					</button>
					{seasonIcon && <img src={`/images/${seasonIcon}-icon.svg`} alt=""/>}
					{ vehicleTransform && <i className={`icon iconfont-${ vehicleTransform.icon }`}></i> }
				</div>
				<img src={default_photo || (lang === Language.UA ? noPhoto : noPhotoRu)} alt={full_name}/>
			</div>
			<p className='font-bold my-2.5 min-h-12'>{full_name}</p>
			<div className='my-3.5 h-5'>
				<CountryInfo
					country={lang === Language.UA ? best_offer.country : best_offer.country_ru}
					year={best_offer.year}
				/>
			</div>
			<div className='mt-4 mb-3'>
				<div className='text-2xl font-bold'>{min_price} грн</div>
			</div>
			<button onClick={(event) => handleClick(event)} className='btn primary w-full'>
				{t('buy', true)}
			</button>
		</Link>
	)
};
