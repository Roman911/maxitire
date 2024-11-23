import { useAppGetProducts, useAppSelector, useAppTranslation } from '../../../hooks';
import { ProductList } from '../../ProductList';
import { Spinner, Title } from '../../../components/Lib';

export const Bookmarks = () => {
	const t = useAppTranslation();
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);

	const { products, isLoading} = useAppGetProducts(bookmarksItems, 'reducerBookmarks');

	if(bookmarksItems.length === 0) return null;

	return <>
		<Title title={ t('favorites', true) } />
		<Spinner height='h-40' show={ isLoading } >
			<ProductList
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-3 md:px-0'
				data={{ products, total_count: products.length }}
			/>
		</Spinner>
	</>
};
