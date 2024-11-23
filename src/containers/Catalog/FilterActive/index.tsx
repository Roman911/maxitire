import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { baseDataAPI } from '../../../services/baseDataService';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { removeParam, resetFilter } from '../../../store/reducers/filterSlice';
import { FilterActiveComponent } from '../../../components/Catalog';
import { Language } from '../../../models/language';
import { parseUrl, generateUrl } from '../seo';
import { IFilter } from '../seoType';

interface FilterActiveProps {
	className: string
}

export const FilterActive: FC<FilterActiveProps> = ({ className }) => {
	const [searchParams, setSearchParams] = useState<IFilter | undefined>(undefined);
	const { filter, section } = useAppSelector(state => state.filterReducer);
	const { lang } = useAppSelector(state => state.langReducer);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { data: dataAkum } = baseDataAPI.useFetchDataAkumQuery('');
	const { data: manufModels } = baseDataAPI.useFetchManufModelsQuery(`${filter.brand}`);

	useEffect(() => {
		if(params['*']) {
			const url = parseUrl(params['*']);
			setSearchParams(url);
		} else {
			setSearchParams(undefined);
		}
	}, [params]);

	const clearParam = (name: keyof IFilter) => {  // Use keyof IFilter to restrict name to valid keys
		if (searchParams) {  // Check if searchParams is defined
			const updatedSearchParams = { ...searchParams };
			delete updatedSearchParams[name];
			const searchUrl = generateUrl(updatedSearchParams);
			setSearchParams(updatedSearchParams);
			dispatch(removeParam({ [name]: null }));
			navigate(`${lang === Language.UA ? '' : '/ru'}/catalog/${section}/${searchUrl}`);
		}
	};

	const clearAllParams = () => {
		dispatch(resetFilter());
		navigate(`${lang === Language.UA ? '' : '/ru'}/catalog/${section}`);
	}

	return <FilterActiveComponent
		data={ data }
		className={ className }
		searchParams={ searchParams }
		clearParam={ clearParam }
		clearAllParams={ clearAllParams }
		manufModels={ manufModels }
		dataAkum={ dataAkum }
		section={ section }
	/>
};
