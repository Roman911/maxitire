import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { baseDataAPI } from '../../../services/baseDataService';
import { useAppTranslation } from '../../../hooks';
import { Spinner, Title } from '../../../components/Lib';
import { ProductList } from '../../ProductList';

interface SimilarProducts {
	id: string
}

export const SimilarProducts: FC<SimilarProducts> = ({ id }) => {
	const location = useLocation();
	const t = useAppTranslation();
	const params = /dia/.test(location.pathname) ? `?typeproduct=3&${id}` : `?${id}`;
	const { data, isLoading } = baseDataAPI.useFetchProductsQuery({ id: params, length: 4 });

	if(id === '') return;

	return <>
		<Title title={ t('similar products', true) } />
		<Spinner height='h-40' show={ isLoading } >
			<ProductList
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-3 md:px-0'
				data={ data?.data }
			/>
		</Spinner>
	</>
};
