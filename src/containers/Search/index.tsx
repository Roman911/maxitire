import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { config } from '../../config';
import { baseDataAPI } from '../../services/baseDataService';
import { useAppSelector, useAppTranslation } from '../../hooks';
import { ProductList } from '../ProductList';
import { LayoutWrapper } from '../../components/Layout';
import { NoResult, Spinner, Title } from '../../components/Lib';
import { Language } from '../../models/language';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Paginate, ShowMore } from '../../components/Catalog';

export const Search = () => {
	const [ paginateCount, setPaginateCount ] = useState(0);
	const [ itemsProduct, setItemsProduct ] = useState(config.catalog.itemsProduct);
	const { lang } = useAppSelector(state => state.langReducer);
	const { search } = useAppSelector(state => state.searchReducer);
	const { data, isLoading } = baseDataAPI.useFetchProductsQuery({ id: `?name=${search}`, length: itemsProduct, start: paginateCount * config.catalog.itemsProduct });
	const t = useAppTranslation();
	const noDataText = lang === Language.UA ? 'На жаль, нічого не знайдено' : 'На жаль, нічого не знайдено';
	const path = [
		{
			id: 1,
			title: t('search', true),
			url: '/'
		}
	]

	const handlePageClick = (event: { selected: number; }) => {
		setPaginateCount(event.selected);
		setItemsProduct(config.catalog.itemsProduct);
	};

	const onClickShowMore = () => {
		setItemsProduct(prevState => prevState + config.catalog.itemsProduct);
	}

	return <LayoutWrapper>
		<Helmet>
			<title>{ t('search', true) } | { config.domain }</title>
		</Helmet>
		<Breadcrumbs path={ path }/>
		<Title title='search' />
		{search.length > 2 ? <Spinner height='h-40' show={ isLoading } >
			<ProductList classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4' data={ data?.data } />
		</Spinner> : <NoResult noResultText={ noDataText } />}
		{ data?.result && paginateCount * config.catalog.itemsProduct + itemsProduct < data.data.total_count &&
			<ShowMore onClickShowMore={ onClickShowMore } title={ lang === Language.UA ? 'Показати більше' : 'Показать больше' } /> }
		{ data?.result && data.data.total_count > 12 &&
			<Paginate
				itemsPerPage={ config.catalog.itemsProduct }
				paginateCount={ paginateCount }
				total_count={ data?.data.total_count }
				handlePageClick={ handlePageClick }
			/>}
	</LayoutWrapper>
};
