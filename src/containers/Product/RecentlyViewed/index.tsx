import { useMemo } from 'react';

import { useAppGetProducts, useAppTranslation } from '../../../hooks';
import { getFromStorage } from '../../../lib';
import { ProductList } from '../../ProductList';
import { Spinner, Title } from '../../../components/Lib';

export const RecentlyViewed = () => {
	const t = useAppTranslation();
	const storage = useMemo(() => {
		return getFromStorage('reducerRecentlyViewed');
	}, []);
	const { products, isLoading} = useAppGetProducts(storage, 'recentlyViewed');

	if(storage.length === 0) return null;

	return <>
		<Title title={ t('recently viewed', true) } />
		<Spinner height='h-40' show={ isLoading } >
			<ProductList
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-3 md:px-0'
				data={{ products, total_count: products.length }}
			/>
		</Spinner>
	</>
};
