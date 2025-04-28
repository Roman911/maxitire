import { FC } from 'react';

import { useAppSelector, useAppTranslation } from '../../../hooks';
import { NpCitySearch, NpDocumentPrice } from '../../../containers/Lib';
import { Language } from '../../../models/language';
import { Quantity } from '../../Lib';
import npLogo from '../../../assets/nova-poshta-logo-white-bg.webp';

interface DeliveryCalculationProps {
	offer_id: number | undefined
	quantity: number
	handleClick: () => void
	onChange: (e: { target: HTMLInputElement }) => void
	onSetQuantity: (id: number, quantity: number) => void
	handleModalClose: () => void
	showDescription: boolean
}

export const DeliveryCalculationComponent: FC<DeliveryCalculationProps> = (
	{
		offer_id,
		quantity,
		showDescription,
		handleClick,
		onChange,
		handleModalClose,
		onSetQuantity
	}) => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { city } = useAppSelector(state => state.orderReducer);
	const t = useAppTranslation();

	return <>
		<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
			<div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
				<div className='flex items-center gap-2'>
					<img src={ npLogo } alt=""/>
					<h3 className="text-base font-semibold leading-6 text-gray-900">
						{ lang === Language.UA ? 'Розрахунок доставки' : 'Расчет доставки' }
					</h3>
				</div>
				<div className='mt-6 mb-4'>
					{ !showDescription && <>
						<p className='mt-4'>
							{ lang === Language.UA ? 'Вкажіть місто' : 'Укажите город' }
						</p>
						<NpCitySearch title={t('city', true)}/>
						<p className='mt-4 mb-2'>
							{ lang === Language.UA ? 'Вкажіть кількість' : 'Укажите количество' }
						</p>
						<Quantity id={0} quantity={ quantity } offerQuantity={ 99 } onChange={ onChange } setQuantity={ onSetQuantity } />
					</>}
					{ showDescription && city.value.length > 0 && <NpDocumentPrice offer_id={ offer_id } quantity={ quantity } /> }
				</div>
			</div>
		</div>
		<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
			{ showDescription ? <button onClick={() => handleModalClose()} type="button" className='btn primary w-max px-5'>
				{ lang === Language.UA ? 'Закрити' : 'Закрыть' }
			</button> : <button onClick={() => handleClick()} type="button" className='btn primary w-max px-5'>
				{ lang === Language.UA ? 'Розрахувати' : 'Рассчитать' }
			</button> }
		</div>
	</>
};
