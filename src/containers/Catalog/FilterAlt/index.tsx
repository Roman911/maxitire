import { FC, useEffect, useState } from 'react';

import { baseDataAPI } from '../../../services/baseDataService';
import { FilterAltComponent } from '../../../components/Catalog';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { changeSection, changeSubsection, setParams, resetFilter } from '../../../store/reducers/filterSlice';
import { Section, Subsection } from '../../../models/filter';
import { setCarFilter } from '../../../store/reducers/filterCarSlice';

interface FilterAltProps {
	isOpenFilter: boolean
	closeFilter: () => void
	isProduct?: boolean
}

export const FilterAlt: FC<FilterAltProps> = ({ isProduct, isOpenFilter, closeFilter }) => {
	const [ element, setElement ] = useState<HTMLElement | null>(null);
	const [ searchParams, setSearchParams ] = useState('');
	const { filter, isSend } = useAppSelector(state => state.filterCarReducer);
	const { filter: filterBrand, section } = useAppSelector(state => state.filterReducer);
	const dispatch = useAppDispatch();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { data: fildterData } = baseDataAPI.useFildterDataQuery(`?typeproduct=${section === Section.Tires ? 1 : section === Section.Disks ? 3 : 4 }${filterBrand.vehicle_type ? `&vehicle_type=${filterBrand.vehicle_type}` : ''}&${searchParams}`);
	const { data: dataAkum } = baseDataAPI.useFetchDataAkumQuery('');
	const { data: model, refetch: modelRefetch } = baseDataAPI.useFetchAutoModelQuery(`${filter.brand}`);
	const { data: modelYear } = baseDataAPI.useFetchAutoYearQuery(`${filter.model}`);
	const { data: modelKit, refetch: modelKitRefetch } = baseDataAPI.useFetchAutoModelKitQuery(`${filter.model}/${filter.year}`);
	const { data: manufModels } = baseDataAPI.useFetchManufModelsQuery(`${filterBrand.brand || '0'}`);

	useEffect(() => {
		if(isSend) {
			dispatch(changeSubsection(Subsection.ByCars));
		}
	}, [dispatch, isSend]);

	useEffect(() => {
		const params = [];
		if(filterBrand.width) params.push(`width=${filterBrand.width}`);
		if(filterBrand.height) params.push(`height=${filterBrand.height}`);
		if(filterBrand.radius) params.push(`radius=${filterBrand.radius}`);

		setSearchParams(params.join('&'))
	}, [filterBrand]);

	const handleClick = (value: Subsection) => {
		dispatch(changeSubsection(value));
	}

	const onClick = (value: Section) => {
		dispatch(resetFilter());
		dispatch(changeSection(value));
	}

	const onChange = (name: string, value: number | string | undefined | null, element: HTMLElement) => {
		if(name === 'brand') {
			dispatch(setParams({ model_id: null }));
		}
		setElement(element);
		dispatch(setParams({ [name]: value }));
	}

	const onChangeByCar = (name: string, value: number | string | undefined) => {
		dispatch(setCarFilter({ ...filter, [name]: value }));
		if(name === 'model') {
			modelRefetch();
		} else if(name === 'modification' || name === 'year') {
			modelKitRefetch();
		}
	}

	return <FilterAltComponent
		isProduct={ isProduct }
		element={ element }
		data={ data }
		fildterData={ fildterData }
		isOpenFilter={ isOpenFilter }
		closeFilter={ closeFilter }
		handleClick={ handleClick }
		onClick={ onClick }
		onChange={ onChange }
		onChangeByCar={ onChangeByCar }
		setElement={ setElement }
		model={ model }
		modelYear={ modelYear }
		modelKit={ modelKit }
		manufModels={ manufModels }
		dataAkum={ dataAkum }
	/>
};
