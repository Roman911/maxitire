import { FC } from 'react';

import { baseDataAPI } from '../../../services/baseDataService';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setWirehouse } from '../../../store/reducers/orderSlice';
import { MySelect } from '../../../components/Order/Select';
import { Language } from '../../../models/language';

interface NpWarehousesSearchProps {
	title: string
}

export const NpWarehousesSearch: FC<NpWarehousesSearchProps> = ({ title }) => {
	const { orderReducer: { city }, langReducer: { lang } } = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const { data } = baseDataAPI.useFetchNpWarehousesQuery(city.value);

	const warehousesOptions = data?.map((item: { Description: string, DescriptionRu: string, Ref: string }) => {
		return { value: item.Ref, label: lang === Language.UA ? item.Description : item.DescriptionRu }
	});

	const onChange = (_: string, value?: number | string, label?: number | string) => {
		const normalizedValue = value?.toString() ?? '';
		const normalizedLabel = label?.toString() ?? '';
		dispatch(setWirehouse({ value: normalizedValue, label: normalizedLabel }));
	};

	return <MySelect
		name='department'
		label={ title }
		options={ warehousesOptions }
		onChange={ onChange }
	/>
};
