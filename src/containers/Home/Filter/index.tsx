import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { baseDataAPI } from '../../../services/baseDataService';

import { useAppSelector, useAppTranslation } from '../../../hooks';
import { FilterComponent } from '../../../components/Home';

import { Section } from '../../../models/filter';
import { Language } from '../../../models/language';
import { generateUrl } from '../../Catalog/seo';
import { customTireSeason } from './selectOptions';

interface FilterProps {
	additionalFilter?: 'tires' | 'disks'
	additionalSection?: Section
}

export const Filter: FC<FilterProps> = ({ additionalFilter, additionalSection }) => {
	const [filter, setFilter] = useState({});
	const navigate = useNavigate();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { section } = useAppSelector(state => state.filterReducer);
	const { lang } = useAppSelector(state => state.langReducer);
	const t = useAppTranslation();

	const getFilters = () => {
		const filterConfigs = [];

		if(additionalSection ? additionalSection === Section.Tires : section === Section.Tires) {
			filterConfigs.push({
				label: t('width', true),
				name: 'width',
				focusValue: '175',
				options: data?.tyre_width?.map(item => ({ value: item.value, label: item.value, p: item.p }))
			});

			filterConfigs.push({
				label: t('height', true),
				name: 'height',
				focusValue: '45',
				options: data?.tyre_height?.map(item => ({ value: item.value, label: item.value, p: item.p }))
			});

			filterConfigs.push({
				label: t('diameter', true),
				name: 'radius',
				focusValue: 'R13',
				options: data?.tyre_diameter?.map(item => ({ value: item.value, label: `R${item.value}`, p: item.p }))
			});

			filterConfigs.push({
				label: 'Сезон',
				name: 'sezon',
				options: customTireSeason.map(item => ({ value: item.value, label: lang === Language.UA ? item.name_ua : item.name }))
			});

			filterConfigs.push({
				label: t('all brands', true),
				name: 'brand',
				options: data?.brand?.map(item => ({ value: item.value, label: item.label }))
			});
		} else if(additionalSection ? additionalSection === Section.Disks : section === Section.Disks) {
			if(!additionalFilter) {
				filterConfigs.push({
					label: t('all brands', true),
					name: 'brand',
					options: data?.brand_disc?.map(item => ({ value: item.value, label: item.label }))
				});
			}

			filterConfigs.push({
				label: t('diameter', true),
				name: 'diameter',
				focusValue: 'R13',
				options: data?.disc_diameter?.map(item => ({ value: item.value, label: `R${item.value}`, p: item.p }))
			});

			if(additionalFilter) {
				filterConfigs.push({
					label: 'DIA', name: 'dia',
					options: data?.dia?.map(item => ({ value: item.value, label: item.value, p: item.p }))
				});

				filterConfigs.push({
					label: t('width', true), name: 'width',
					options: data?.disc_width?.map(item => ({ value: item.value, label: item.value, p: item.p }))
				});

				filterConfigs.push({
					label: t('all brands', true),
					name: 'brand',
					options: data?.brand_disc?.map(item => ({ value: item.value, label: item.label }))
				});
			}

			filterConfigs.push({
				label: t('fasteners', true),
				name: 'krepeg',
				options: data?.krip?.map(item => ({ value: item.value, label: item.value, p: item.p }))
			});

			if(additionalFilter) {
				filterConfigs.push({
					label: 'ET', name: 'et',
					options: data?.et?.map(item => ({ value: item.value, label: item.value, p: item.p }))
				});
			}

			if(!additionalFilter) {
				filterConfigs.push({
					label: 'ET ' + t('from'), name: 'etMin',
					options: data?.et?.map(item => ({ value: item.value, label: item.value, p: item.p }))
				});

				filterConfigs.push({
					label: 'ET ' + t('to'), name: 'etMax',
					options: data?.et?.map(item => ({ value: item.value, label: item.value, p: item.p }))
				});
			}
		}

		return filterConfigs.map(config => ({
			...config,
			wide: true
		}));
	};

	const onChange = (name: string, value: number | string | undefined) => {
		if(value) {
			setFilter(prev => ({ ...prev, [name]: value}));
		}
	}

	const submit = () => {
		const searchUrl = generateUrl(filter);
		const rout = `/catalog/${additionalFilter || section}/`;
		const newRout = lang === Language.UA ? rout : `/ru${rout}`;
		navigate(newRout + searchUrl);
	}

	return <FilterComponent
		data={ getFilters() }
		section={ additionalSection ? additionalSection : section }
		onChange={ onChange }
		onSubmit={ submit }
		additionalFilter={ additionalFilter }
	/>
};
