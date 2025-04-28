import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { baseDataAPI } from '../../services/baseDataService';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { reset as resetFilter } from '../../store/reducers/filterSlice';
import { reset as resetFilterCar } from '../../store/reducers/filterCarSlice';
import { LayoutWrapper } from '../../components/Layout';
import { Filter } from './Filter';
import { ProductList } from '../ProductList';
import { Support } from './Support';
import { ShowAll } from '../../components/Home';
import { NoResult, Spinner, Title } from '../../components/Lib';
import { Language } from '../../models/language';

export const Home = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);
	const { data, isLoading } = baseDataAPI.useFetchProductsQuery({ id: '?order[value]=featured' });
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(resetFilter());
		dispatch(resetFilterCar());
	}, [dispatch]);

	return <main>
		<Helmet>
			<title>{ settings[lang].meta_title }</title>
		</Helmet>
		<Filter />
		<LayoutWrapper>
			<Title title='Рекомендовані товари' />
			<Spinner height='h-40' show={ isLoading } size='large'>
				{data?.result ? <ProductList
					classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
					data={ data?.data }
				/> : <NoResult
					noResultText={ lang === Language.UA ? 'На жаль, по заданих параметрах товарів не знайдено' : 'К сожалению, по заданным параметрам товаров не найдено' }
				/>}
			</Spinner>
			<ShowAll />
		</LayoutWrapper>
		<Support />
	</main>
};
