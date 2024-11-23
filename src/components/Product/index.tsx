import { FC, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';

import './index.scss';
import { useAppSelector, useAppTranslation } from '../../hooks';
import { InfoBlock } from './InfoBlock';
import { ActionsBlock } from '../../containers/Product/ActionsBlock';
import { ImgGallery } from './ImageGallery';
import { CharacteristicsBlock } from './CharacteristicsBlock';
import { countryCodeTransform, Link, SeasonTransform, VehicleTypeTransform } from '../../lib';
import { CountryInfo, Quantity, Rating, Spinner } from '../Lib';
import { CartIcon, MarkerIcon, BusIcon, CargoIcon, CarIcon, MotorcyclesIcon, SpecialEquipmentIcon, SuvIcon } from "../Lib/Icons";
import truckIcon from '../../assets/icons/truck-icon.svg';
import { Language } from '../../models/language';
import { Section } from '../../models/filter';
import { OtherModelSize } from '../../containers/Product/OtherModelSize';
import type { ProductProps } from '../../models/product';

import noPhoto from '../../assets/no-photo.jpg';
import noPhotoRu from '../../assets/no-photo-ru.jpg';
import warningIcon from '../../assets/warning-icon.svg';

const Icons = {
	light: CarIcon,
	bus: BusIcon,
	cargo: CargoIcon,
	motorcycle: MotorcyclesIcon,
	special: SpecialEquipmentIcon,
	suv: SuvIcon,
};

interface ProductComponentProps {
	data: ProductProps | undefined
	isLoading: boolean
	offerId: number
	quantity: number
	section: string
	onChange: (e: { target: HTMLInputElement }) => void
	handleClick: (id: number) => void
	onSubmit: () => void
	setQuantity: Dispatch<SetStateAction<number>>
	handleModalOpen: (type: 'QuickOrder' | 'OnlineInstallment' | 'DeliveryCalculation' | 'Callback' | 'AddAsk') => void
}

export const ProductComponent: FC<ProductComponentProps> = (
	{
		data,
		isLoading,
		offerId,
		quantity,
		onChange,
		onSubmit,
		section,
		handleClick,
		handleModalOpen,
		setQuantity
	}) => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { cartItems } = useAppSelector(state => state.cartReducer);
	const t = useAppTranslation();
	const vehicleType = data?.data.offer_group.vehicle_type;
	const vehicleTransform = vehicleType ? VehicleTypeTransform(vehicleType) : undefined;
	const IconComponent = vehicleTransform ? Icons[vehicleTransform.icon] : undefined;

	const { id = 0, full_name = '', offers = [], min_price = 0, photo, model, labels } = data?.data || {};
	const offer = offers.find(item => item.offer_id === offerId);

	const imgArr = data?.data.photos.urls ? data.data.photos.urls.map(item => {
		return {
			original: item.big,
			thumbnail: item.small
		}
	}) : [];

	const images = [{
		original: photo?.url_part2 || '',
		thumbnail: photo?.url_part || '',
	}, ...imgArr];

	const onSetQuantity = (_: number,quan: number) => {
		setQuantity(quan);
	}

	const review = data?.data.review;
	const commentsAvgRateSum = review && review.length > 0
		? review.reduce((sum, current) => sum + (current.score || 0), 0)
		: 0;

	const averageScore = review && review.length > 0 ? commentsAvgRateSum / review.length : undefined;

	return <section className='product-page flex flex-col 2xl:flex-row justify-between gap-1 2xl:gap-x-6 mt-4 md:mt-0'>
		<div className='max-w-[900px] flex-1 pr-3 xl:pr-5'>
			<Spinner height='h-96' show={ isLoading }>
				{data?.result &&
					<div className='flex flex-col md:flex-row items-center md:items-start md:border-b border-[#DEE2EB]'>
						<div className={ classNames('gallery relative mb-7 pt-10 pb-5', { 'w-64': images.length > 1, 'w-72': images.length <= 1 }) }>
							<div className='-mt-10 mb-2 w-full flex justify-between items-start'>
								<div>
									{labels?.length !== 0 && labels?.map(item => {
										return <div key={item.label_id}
																className='text-center text-xs font-semibold text-white uppercase py-1.5 px-2.5 max-w-max rounded-sm my-1'
																style={{backgroundColor: item.label.color}}>
											{lang === Language.UA ? item.label.name : item.label.name_ru}
										</div>
									})}
									<div className='flex gap-x-2'>
										{IconComponent && (<IconComponent className={classNames('fill-gray-500', { 'stroke-gray-500': vehicleType === '2' })} />)}
										{model?.season && <img src={ SeasonTransform(model.season)?.icon } alt=""/> }
									</div>
								</div>
								{ model?.brand_image && <img className='max-w-28 object-contain' src={ model?.brand_image } alt=""/> }
							</div>
							{ photo?.url_part === '' ?
								<img src={ lang === Language.UA ? noPhoto : noPhotoRu } alt="" /> :
								<ImgGallery images={ images } /> }
						</div>
						<ActionsBlock className='flex md:hidden' id={ id } handleModalOpen={ handleModalOpen } section={ section } />
						<div className='flex-1 md:ml-6 xl:ml-10'>
							<h1 className='text-2xl font-bold mt-8 md:mt-0'>{ full_name }</h1>
							<div className='flex justify-between flex-col xl:flex-row xl:items-center mt-5'>
								<div className='mb-4 xl:mb-0'>
									<div className='text-[15px] text-gray-500 mr-5 max-w-max mb-2'>Артикул: {id}</div>
									<Rating
										commentsCount={review ? (review.length > 0 ? review.length : undefined) : undefined}
										commentsAvgRate={averageScore || 0}
									/>
								</div>
								<ActionsBlock className='hidden md:flex' id={ id } handleModalOpen={ handleModalOpen } section={ section } />
							</div>
							<div className='mt-7 md:mt-11'>
								<div className='flex items-end'>
									<div className='mr-2.5 text-xl font-medium'>{t('price')}</div>
									<div className='text-4xl font-bold mr-2.5'>{min_price}</div>
									<div className='text-xl font-medium'>грн/шт.</div>
								</div>
								{section === Section.Tires && <div className='mt-3 text-gray-500'>
									{lang === Language.UA ? '* ціна вказана за одну шину без диску' : '* цена указана за одну шину без диска'}
								</div>}
								{section === Section.Disks && <div className='mt-3 text-gray-500'>
									{lang === Language.UA ? '* ціна вказана за один диск без шини' : '* цена указана за один диск без шины'}
								</div>}
							</div>
							<div className='offers mt-7 mb-5'>
								{offers.map(item => {
									return <div key={item.offer_id} onClick={() => handleClick(item.offer_id)}
															className='offers__item cursor-pointer grid md:grid-cols-9 gap-1 md:gap-4 items-center mt-3 py-1.5 md:py-0 px-2 md:px-0 bg-white md:bg-transparent border md:border-0 rounded-full'>
										<div className='input flex flex-row md:col-span-2 relative'>
											<input type="checkbox" onChange={() => handleClick(item.offer_id)} checked={item.offer_id === offerId} className='appearance-none h-6 w-6 bg-white rounded-full border border-zinc-400 hover:border-blue-500 checked:border-blue-500 transition-all duration-200 peer'/>
											<div className='h-4 w-4 absolute inset-1 rounded-full peer-checked:border-blue-500 peer-checked:bg-blue-500'/>
											<label className='flex ml-1.5 md:ml-7 flex-col justify-center text-sm font-medium cursor-pointer'>{item.quantity} шт.</label>
										</div>
										<div className='country md:col-span-3'>
											<CountryInfo country={ lang === Language.UA ? item.country : item.country_ru } countryCode={ countryCodeTransform(item.country) } year={ item.year } mobileHidden={ true } />
										</div>
										<div className='storage md:col-span-2 text-sm content-center flex items-center gap-x-1 md:gap-x-2'>
											<MarkerIcon className='fill-gray-400 w-3' />
											{ lang === Language.UA ? item.posts.city : item.posts.city_ru }
										</div>
										<div className='price md:col-span-2 md:text-sm font-bold content-center'>
											{ item.price } грн
										</div>
									</div>
								})}
							</div>
						</div>
					</div>}
			</Spinner>
			<div className='purchase-information grid justify-self-stretch mt-5 md:mt-10'>
				<Quantity id={ 0 } quantity={ quantity } offerQuantity={ (Number(offer?.quantity) || 0) } price={ offer?.price } onChange={ onChange } setQuantity={ onSetQuantity } />
				<button
					onClick={() => handleModalOpen('DeliveryCalculation')}
					className='delivery-calculation btn white mt-2.5 md:mt-6 text-sm font-medium w-full md:w-72'>
					<img className='mr-2.5' src={truckIcon} alt=""/>
					{t('delivery calculation', true)}
				</button>
				<div className='buttons-buy md:justify-self-end mt-6 md:mt-0'>
					{cartItems.find(item => item.id === offerId) ?
						<Link to={`/cart`} className='btn success uppercase w-full md:w-72'>
							<span className='ml-2.5'>{ lang === Language.UA ? 'Перейти до кошика' : 'Перейти в корзину' }</span>
						</Link> :
						<button onClick={() => onSubmit()} className='btn primary uppercase w-full md:w-72'>
							<CartIcon className='stroke-white'/>
							<span className='ml-2.5'>{t('buy')}</span>
						</button>
					}
					<button onClick={() => handleModalOpen('QuickOrder')}
									className='btn white uppercase mt-2.5 w-full md:w-72'>
						<span className='ml-2.5'>{t('quick order')}</span>
					</button>
				</div>
			</div>
			{section !== Section.Battery && <div className='my-10 p-8 bg-[#FDFEFF] border border-gray-200 rounded-sm'>
				<div className='flex items-center gap-2'>
					<img src={warningIcon} alt=""/>
					<h4 className='text-lg font-bold'>
						{lang === Language.UA ? 'Зверніть увагу!' : 'Обратите внимание!'}
					</h4>
				</div>
				{lang === Language.UA ?
					<p className='text-sm mt-5'>При покупці <strong>менше 4-х одиниць</strong> товару вартість може бути вище
						зазначеної. Бувають випадки, коли у нас немає можливості продати менше 4-х одиниць товару.</p> :
					<p className='text-sm mt-5'>При покупке <strong>менее 4-х единиц</strong> товара стоимость может быть выше
						указанной. Бывают случаи, когда у нас нет возможности продать менее 4 единиц товара.</p>}
			</div>}
			<CharacteristicsBlock data={data}/>
			{ section !== Section.Battery &&
				<OtherModelSize section={ section } diameter={ data?.data.offer_group.diameter } brand={ data?.data.brand.id } model={ data?.data.model.id } vehicle_type={ data?.data.offer_group.vehicle_type } />
			}
		</div>
		<InfoBlock handleModalOpen={ handleModalOpen } />
	</section>
};
