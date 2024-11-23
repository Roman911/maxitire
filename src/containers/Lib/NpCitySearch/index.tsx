import { FC, useState } from 'react';

import { baseDataAPI } from '../../../services/baseDataService';
import { useAppDispatch } from '../../../hooks';
import { setCity } from '../../../store/reducers/orderSlice';
import { MySelect } from '../../../components/Order/Select';

interface NpCitySearchProps {
	title: string
}

export const NpCitySearch: FC<NpCitySearchProps> = ({ title }) => {
	const [city, setCityState] = useState<string | undefined>('');
	const dispatch = useAppDispatch();
	const { data } = baseDataAPI.useFetchNpSearchQuery(city);

	const cityOptions = data?.[0].Addresses?.map((item: { MainDescription: string, Ref: string }) => ({
		value: item.Ref,
		label: item.MainDescription,
	}));

	const onChange = (_: string, value?: number | string, label?: number | string) => {
		const normalizedValue = value?.toString() ?? '';
		const normalizedLabel = label?.toString() ?? '';
		setCityState(normalizedLabel);
		dispatch(setCity({ value: normalizedValue, label: normalizedLabel }));
	};

	return <MySelect
		name='city'
		label={ title }
		options={ cityOptions }
		onChange={ onChange }
		setState={ setCityState }
	/>
};
