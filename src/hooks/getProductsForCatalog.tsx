import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { IFilter, Section } from '../models/filter';

import { parseUrl } from '../containers/Catalog/seo';

const special = ['3','4','5','6','9','10','11'];

const initialFilterState: IFilter = {
	width: null,
	height: null,
	radius: null,
	sezon: null,
	brand: null,
	model_id: null,
	country: null,
	year: null,
	omolog: null,
	krepeg: null,
	typedisk: null,
	colir: null,
	jemnist: null,
	puskovii_strum: null,
	tip_elektrolitu: null,
	tip_korpusu: null,
	napruga: null,
	poliarnist: null,
	vehicle_type: null,
	li: null,
	si: null,
	only_studded: null,
	only_c: null,
	only_xl: null,
	only_owl: null,
	only_run_flat: null,
	only_off_road: null,
	minPrice: null,
	maxPrice: null,
	et: null,
	etMin: null,
	etMax: null,
	dia: null,
	diaMin: null,
	diaMax: null,
	minShirina: null,
	maxShirina: null,
	minVisota: null,
	maxVisota: null,
	minDovzina: null,
	maxDovzina: null,
}

const paramKeys: Array<keyof IFilter> = [
	'width', 'height', 'radius', 'sezon', 'brand', 'model_id', 'country', 'year', 'omolog',
	'krepeg', 'typedisk', 'colir', 'jemnist', 'puskovii_strum', 'tip_elektrolitu',
	'tip_korpusu', 'napruga', 'poliarnist', 'vehicle_type', 'li', 'si', 'only_studded',
	'only_c', 'only_xl', 'only_owl', 'only_run_flat', 'only_off_road', 'minPrice', 'maxPrice', 'et',
	'etMin', 'etMax', 'dia', 'diaMin', 'diaMax', 'minShirina', 'maxShirina', 'minVisota', 'maxVisota',
	'minDovzina', 'maxDovzina'
];

export const useAppGetProductsForCatalog = () => {
	const urlParams = useParams();
	const [ params, setParams ] = useState<string[]>([]);
	const [ filter, setFilter ] = useState<IFilter>(initialFilterState);

	useEffect(() => {
		if(urlParams['*']) {
			const url = parseUrl(urlParams['*']);
			setFilter(url);
		} else {
			setFilter(initialFilterState);
		}
	}, [urlParams]);


	// General function to update params list
	const updateParamsList = useCallback((key: string, value: string | null | undefined) => {
		setParams(prevParams => {
			const updatedParams = prevParams.filter(param => !param.startsWith(`${key}=`));
			if(value) updatedParams.push(`${key}=${value}`);
			return updatedParams;
		});
	}, []);

	// Update params when filter changes
	useEffect(() => {
		// Loop through each key in the paramKeys array and update the params list.
		paramKeys.forEach(key => {
			updateParamsList(key, filter[key] ?? '');
		});
	}, [filter, updateParamsList]);

	// Function to handle form submit (update URL)
	return useMemo(() => {
		const sectionTypeMap: Record<Section, string> = {
			[Section.Disks]: 'typeproduct=3&',
			[Section.Battery]: 'typeproduct=4&',
			[Section.Tires]: (filter.vehicle_type && special.includes(filter.vehicle_type)) ? 'typeproduct=2&' : '',
			[Section.Car]: '',
		};

		const section = urlParams['section'] as Section;
		return `${sectionTypeMap[section] || ''}${params.join('&')}`;
	}, [filter.vehicle_type, params, urlParams]);
};
