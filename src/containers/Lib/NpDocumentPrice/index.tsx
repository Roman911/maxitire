import { FC } from 'react';

import { config } from '../../../config';
import { baseDataAPI } from '../../../services/baseDataService';
import { useAppSelector } from '../../../hooks';
import { Spinner } from '../../../components/Lib';
import { Language } from '../../../models/language';

interface NpDocumentPriceProps {
	offer_id: number | undefined
	quantity: number
}

export const NpDocumentPrice: FC<NpDocumentPriceProps> = ({ offer_id, quantity }) => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { city } = useAppSelector(state => state.orderReducer);
	const { data, isLoading } = baseDataAPI.useFetchNpDocumentPriceQuery({ offer_id, ref: city.value, count: quantity });

	return <Spinner height='h-40' show={ isLoading }>
		<p className='mt-4'>
			{ lang === Language.UA ? `Розрахункова вартість доставки за ${ quantity } шт.` : `Расчетная стоимость доставки за ${ quantity } шт.` }
		</p>
		<h3 className="text-base font-semibold leading-6 text-gray-900 mt-6">
			{ lang === Language.UA ? 'Вартість:' : 'Стоимость:' } { data?.[0].Cost } грн
		</h3>
		<h3 className="text-base font-semibold leading-6 text-gray-900 mt-3">
			{ lang === Language.UA ? 'З післяплатою: ' : 'С наложенным платежом: ' }
			{ Math.round(data?.[0].Cost * config.deliveryCalculation.postpaid.cof * 100) / 100 + config.deliveryCalculation.postpaid.const } грн
		</h3>
	</Spinner>
};
