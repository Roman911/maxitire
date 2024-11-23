import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { addToStorage, getFromStorage, removeFromStorage } from '../../lib';
import { useAppDispatch, useAppGetProducts, useAppSelector, useAppTranslation } from '../../hooks';
import { removeCart, setQuantity } from '../../store/reducers/cartSlice';
import { LayoutWrapper } from '../../components/Layout';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResult, Spinner, Title } from '../../components/Lib';
import { CartComponent } from '../../components/Cart';
import { Language } from '../../models/language';

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
};

export const Cart = () => {
	const t = useAppTranslation();
	const dispatch = useAppDispatch();
	const { settings } = useAppSelector(state => state.settingsReducer);
	const { lang } = useAppSelector(state => state.langReducer);
	const { cartItems } = useAppSelector(state => state.cartReducer);
	const path = [{ id: 1, title: t('cart', true), url: '/' }];
	const { tires, cargo, disks, battery, isLoading} = useAppGetProducts(cartItems, 'reducerCart', true);
	const data = {
		result: true,
		data: {
			total_count: 5,
			products: [...tires,...cargo,...disks,...battery]
		}
	};

	useEffect(() => {
		scrollToTop();
	}, []);

	const removeProduct = (id: number) => {
		removeFromStorage('reducerCart', id);
		dispatch(removeCart(id));
	};

	const onSetQuantity = (id: number, quantity: number) => {
		const storage = getFromStorage('reducerCart');
		const item = storage.find((i: { id: number, section: string, quantity: number }) => i.id === id);
		addToStorage('reducerCart', [...storage.filter((i: { id: number }) => i.id !== id), { ...item, quantity }]);
		dispatch(setQuantity({ ...item, quantity }));
	}

	return <LayoutWrapper>
		<Helmet>
			<title>{ t('cart', true) } | { settings?.['ua'].config_name }</title>
		</Helmet>
		<Breadcrumbs path={ path } />
		<Title title='cart' />
		<Spinner height='h-40' show={ isLoading }>
			{ cartItems.length > 0 && data?.result ? <CartComponent
					data={ data }
					cartItems={ cartItems }
					removeProduct={ removeProduct }
					setQuantity={ onSetQuantity }
				/> :
				<NoResult
					noResultText={ lang === Language.UA ? 'Ви ще не додали до кошику жодного товару' : 'Вы еще не добавили в корзину ни одного товара' }
				/> }
		</Spinner>
	</LayoutWrapper>
};
