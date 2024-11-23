import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useAppSelector, useAppTranslation } from '../../hooks';
import { MySelect } from './Select';
import { Summary } from './Summary';
import { PhoneMaskInput, TextFile } from '../Lib';
import { NpCitySearch, NpWarehousesSearch } from '../../containers/Lib';
import { Language } from '../../models/language';
import type { ProductsProps } from '../../models/products';
import type { OrdersParamProps } from '../../models/ordersParam';

interface OrderProps {
	data: ProductsProps | undefined
	isLoading: boolean
	loadingBtn: boolean
	showNpWarehouses: boolean | undefined
	shippingMethod: string | number | undefined
	cartItems: { id: number; quantity: number }[]
	onChange: (name: string, value: number | string | undefined) => void
	dataOrdersParam: OrdersParamProps | undefined
}

export const OrderComponent: FC<OrderProps> = (
	{
		data,
		isLoading,
		cartItems,
		onChange,
		loadingBtn,
		shippingMethod,
		dataOrdersParam,
		showNpWarehouses,
	}) => {
	const { control, formState: { errors } } = useFormContext();
	const { lang } = useAppSelector(state => state.langReducer);
	const t = useAppTranslation();

	const deliverysOptions = dataOrdersParam?.Deliverys.map(item => {
		return { value: item.deliverys_id, label: lang === Language.UA ? item.name : item.name_ru }
	});

	const paymentsOptions = dataOrdersParam?.Payments.map(item => {
		return { value: item.payments_id, label: lang === Language.UA ? item.name : item.name_ru }
	});

	return <div className='flex flex-col lg:flex-row gap-6'>
		<div className='flex-1'>
			<div className='bg-white pt-5 pb-8 px-6'>
				<h3 className='font-bold text-xl'>
					{lang === Language.UA ? 'Контактні дані' : 'Контактные данные'}
				</h3>
				<input
					type={'text'}
					placeholder=' '
				/>
				<Controller
					name="firstname"
					control={control}
					render={({field}) => {
						return <TextFile field={field} label={lang === Language.UA ? 'Ім\'я' : 'Имя'} error={typeof errors?.['firstname']?.message === 'string' ? errors['firstname'].message : null}/>
					}}
				/>
				<Controller
					name="lastname"
					control={control}
					render={({field}) => {
						return <TextFile field={field} label={lang === Language.UA ? 'Прізвище' : 'Фамилия'} error={typeof errors?.['lastname']?.message === 'string' ? errors['lastname'].message : null}/>
					}}
				/>
				<Controller
					name="surname"
					control={control}
					render={({field}) => {
						return <TextFile field={field} label={lang === Language.UA ? 'По батькові' : 'Отчество'} error={typeof errors?.['surname']?.message === 'string' ? errors['surname'].message : null}/>
					}}
				/>
				<PhoneMaskInput />
				<Controller
					name="email"
					control={control}
					render={({field}) => {
						return <TextFile field={field} label={lang === Language.UA ? 'Електронна пошта' : 'Электронная почта'} error={typeof errors?.['email']?.message === 'string' ? errors['email'].message : null}/>
					}}
				/>
			</div>
			<div className='bg-white pt-5 pb-8 px-6 mt-4'>
				<h3 className='font-bold text-xl'>{lang === Language.UA ? 'Доставка та оплата' : 'Доставка и оплата' }</h3>
				<div className="relative mt-6 w-full min-w-[200px]">
					<h4 className='font-semibold'>
						{lang === Language.UA ? 'Виберіть спосіб доставки' : 'Выберите способ доставки'}
					</h4>
					<div className='mt-3'>
						<MySelect name='shipping_method' label={lang === Language.UA ? 'Спосіб доставки' : 'Способ доставки'}
											options={deliverysOptions} onChange={onChange}/>
					</div>
					{(shippingMethod === 2 || shippingMethod === 3) && <div className='mt-3'>
						<NpCitySearch title={ t('city', true) } />
					</div>}
					{shippingMethod === 2 && showNpWarehouses && <div className='mt-3'>
						<NpWarehousesSearch title={ t('department', true) } />
					</div>}
					{shippingMethod === 3 && <Controller
						name="address"
						control={control}
						render={({field}) => {
							return <TextFile field={field} label={lang === Language.UA ? 'Адреса (Вулиця, будинок)' : 'Адрес (Улица, дом)'} error={typeof errors?.['address']?.message === 'string' ? errors['address'].message : null}/>
						}}
					/>}
					<h4 className='font-semibold mt-6'>
						{ lang === Language.UA ? 'Виберіть спосіб оплати' : 'Выберите способ оплаты' }
					</h4>
					<MySelect name='payment_method' label='Способ оплаты' options={ paymentsOptions } onChange={ onChange }/>
				</div>
			</div>
			<div className='bg-white pt-5 pb-8 px-6 mt-4 md:mb-20'>
				<h4 className='font-semibold'>
					{lang === Language.UA ? 'Додати коментар' : 'Додати коментар'}
				</h4>
				<Controller
					name="comment"
					control={control}
					render={({field}) => <TextFile field={ field } label={ lang === Language.UA ? 'Ваш коментар' : 'Ваш комментарий' } error={ typeof errors?.['text']?.message === 'string' ? errors['text'].message : null } isTextarea={ true } /> }
				/>
			</div>
		</div>
		<Summary data={ data } isLoading={ isLoading } cartItems={ cartItems } loadingBtn={ loadingBtn } />
	</div>
};
