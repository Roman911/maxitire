import { Helmet } from 'react-helmet-async';

import { config } from '../../config';
import { useAppGetProducts, useAppSelector, useAppTranslation } from '../../hooks';
import { ProductList } from '../ProductList';
import { LayoutWrapper } from '../../components/Layout';
import { NoResult, Spinner, Title } from '../../components/Lib';
import { Language } from '../../models/language';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const Bookmarks = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const t = useAppTranslation();
	const noDataText = lang === Language.UA ? 'Ви ще не додали в обране жодного товару' : 'Вы еще не добавили в избранное ни одного товара';
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { products, isLoading} = useAppGetProducts(bookmarksItems, 'reducerBookmarks');

	const path = [
		{
			id: 1,
			title: t('favorites', true),
			url: '/'
		}
	]

	return <LayoutWrapper>
		<Helmet>
			<title>{ t('favorites', true) } | { config.domain }</title>
		</Helmet>
		<Breadcrumbs path={ path }/>
		<Title title='favorites' />
		{bookmarksItems.length > 0 ? <Spinner height='h-40' show={ isLoading } >
			<ProductList
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
				data={{ products, total_count: products.length }}
			/>
		</Spinner> : <NoResult noResultText={ noDataText } />}
	</LayoutWrapper>
};
