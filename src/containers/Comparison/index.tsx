import { Helmet } from 'react-helmet-async';

import { config } from '../../config';
import { addToStorage, getFromStorage, removeFromStorage, resetStorage } from '../../lib';
import { useAppGetProducts, useAppDispatch, useAppSelector, useAppTranslation } from '../../hooks';
import { removeComparison, reset } from '../../store/reducers/comparisonSlice';
import { addCart } from '../../store/reducers/cartSlice';
import { LayoutWrapper } from '../../components/Layout';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResult, Spinner, Title } from '../../components/Lib';
import { ComparisonComponent } from '../../components/Comparison';
import { Language } from '../../models/language';
import { Support } from '../Layout/Support';

export const Comparison = () => {
	const dispatch = useAppDispatch();
	const t = useAppTranslation();
	const { lang } = useAppSelector(state => state.langReducer);
	const noDataText = lang === Language.UA ? 'Ви ще не додали в обране жодного товару' : 'Вы еще не добавили в избранное ни одного товара';
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const { tires, cargo, disks, battery, isLoading} = useAppGetProducts(comparisonItems, 'reducerComparison');

	const path = [
		{
			id: 1,
			title: t('comparison', true),
			url: '/'
		}
	];

	const handleClick = (id: number) => {
		dispatch(removeComparison(id));
		removeFromStorage('reducerComparison', id)
	}

	const resetEverything = () => {
		dispatch(reset());
		resetStorage('reducerComparison');
	}

	const onClick = (offerId: number, section: string) => {
		const cartStorage = getFromStorage('reducerCart');
		const cart = [ ...cartStorage, { id: offerId, section, quantity: 1 }];
		dispatch(addCart({ id: offerId, section, quantity: 1 }));
		addToStorage('reducerCart', cart);
	}

	return <LayoutWrapper >
		<Helmet>
			<title>{ t('comparison', true) } | { config.domain }</title>
		</Helmet>
		<Breadcrumbs path={ path } />
		<Title title='comparison' />
		{comparisonItems.length > 0 ? <Spinner height='h-40' show={ isLoading } >
			<ComparisonComponent
				defaultTab={ tires.length > 0 ? 'tires' : cargo.length > 0 ? 'cargo' : disks.length > 0 ? 'disks' : 'battery' }
				tires={ tires }
				cargo={ cargo }
				disks={ disks }
				battery={ battery }
				resetEverything={ resetEverything }
				handleClick={ handleClick }
				onClick={ onClick }
			/>
		</Spinner> : <NoResult noResultText={ noDataText } />}
		<Support />
	</LayoutWrapper>
};
