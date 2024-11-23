import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { config } from '../../config';
import { baseDataAPI } from '../../services/baseDataService';
import { useAppDispatch, useAppGetProducts, useAppSelector, useAppTranslation } from '../../hooks';
import { reset } from '../../store/reducers/cartSlice';
import { OrderComponent } from '../../components/Order';
import { Title } from '../../components/Lib';
import { LayoutWrapper } from '../../components/Layout';
import { Breadcrumbs } from '../../components/Breadcrumbs';

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
};

const schema = yup.object().shape({
	firstname: yup.string().required('Це поле обовʼязкове.'),
	lastname: yup.string().required('Це поле обовʼязкове.'),
	surname: yup.string(),
	telephone: yup.string().min(13, 'Це поле обовʼязкове.').max(13).required('Це поле обовʼязкове.'),
	email: yup.string().email(),
	address: yup.string(),
	comment: yup.string(),
});

interface FormProps {
	firstname: string
	lastname: string
	surname?: string
	telephone: string
	email?: string
	address?: string
	comment?: string
}

const defaultValues = {
	firstname: '',
	lastname: '',
	surname: '',
	telephone: '',
	email: '',
	address: '',
	comment: '',
}

export const Order = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [loadingBtn, setLoadingBtn] = useState(false);
	const [shippingMethod, setShippingMethod] = useState<number | string | undefined>(1);
	const [paymentMethod, setPaymentMethod] = useState<number | string | undefined>(1);
	const { cartItems } = useAppSelector(state => state.cartReducer);
	const { city, wirehouse } = useAppSelector(state => state.orderReducer);
	const t = useAppTranslation();
	const { tires, cargo, disks, battery, isLoading} = useAppGetProducts(cartItems, 'reducerCart', true);
	const { data: dataOrdersParam } = baseDataAPI.useFetchOrdersParamQuery('');
	const [ createOrder ] = baseDataAPI.useCreateOrderMutation();

	useEffect(() => {
		scrollToTop();
	}, []);

	const data = {
		result: true,
		data: {
			total_count: 5,
			products: [...tires,...cargo,...disks,...battery]
		}
	}

	const products = data?.data.products?.map((item) => {
		return {
			product_id: item.product_id,
			offer_id: item.best_offer.id,
			price: Number(item.best_offer.price),
			quantity: cartItems.find(i => i.id === item.best_offer.id)?.quantity,
		}
	});

	const items = data?.data.products.map(item => {
		const id = item.best_offer.id;
		const price = item.best_offer.price;
		const quantity = cartItems.find(i => i.id === id)?.quantity;

		return { id, price, quantity }
	});

	const total = items?.reduce((sum, item) => sum + (item.quantity ?? 0) * parseFloat(item.price), 0);

	const methods = useForm<FormProps>({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(schema),
	})

	const path = [
		{
			id: 1,
			title: t('cart', true),
			url: '/cart'
		},
		{
			id: 2,
			title: t('placing an order', true),
			url: '/'
		},
	];

	const onSubmit: SubmitHandler<FormProps> = async (data) => {
		const { firstname, lastname, surname, email, telephone, comment, address } = data;
		setLoadingBtn(true);
		await createOrder({
			fast: 0,
			firstname,
			lastname,
			surname,
			email,
			telephone,
			total,
			comment: comment || 'null',
			payment_method: paymentMethod,
			shipping_method: shippingMethod,
			payment_address_1: wirehouse.label || 'null',
			payment_address_2: address || 'null',
			payment_city: city.label,
			ref_wirehouse: wirehouse.value,
			ref_city: city.value,
			products,
		}).then((response: { data?: { result: boolean, linkpay: string }; error?: FetchBaseQueryError | SerializedError }) => {
			const data = response?.data;
			if (data) {
				if(data?.linkpay?.length > 0) {
					window.open(data?.linkpay, "_blank");
				}
				if(data?.result) {
					methods.reset();
					dispatch(reset());
					navigate('/order/successful');
				}
			} else if (response.error) {
				console.error('An error occurred:', response.error);
			}
		}).finally(() => {
			setLoadingBtn(false);
		});
	}

	const onChange = (name: string, value: number | string | undefined) => {
		if(name === 'shipping_method'){
			setShippingMethod(value);
		} else if(name === 'payment_method'){
			setPaymentMethod(value);
		}
	}

	return <LayoutWrapper>
		<Helmet>
			<title>{ t('placing an order', true) } | { config.domain }</title>
		</Helmet>
		<div className='max-w-5xl mx-auto'>
			<Breadcrumbs path={ path }/>
			<Title title='placing an order'/>
			<FormProvider { ...methods }>
				<form onSubmit={ methods.handleSubmit(onSubmit) }>
					<OrderComponent
						data={ data }
						isLoading={ isLoading }
						cartItems={ cartItems }
						onChange={ onChange }
						loadingBtn={ loadingBtn }
						shippingMethod={ shippingMethod }
						dataOrdersParam={ dataOrdersParam }
						showNpWarehouses={ city.value?.length > 0 }
					/>
				</form>
			</FormProvider>
		</div>
	</LayoutWrapper>
};
