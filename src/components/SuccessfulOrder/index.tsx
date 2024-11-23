import { FC } from 'react';

import { useAppSelector } from '../../hooks';
import { Link } from '../../lib';
import { Language } from '../../models/language';

interface SuccessfulOrderProps {
	quickOrder: boolean
}

export const SuccessfulOrderComponent: FC<SuccessfulOrderProps> = ({ quickOrder }) => {
	const { lang } = useAppSelector(state => state.langReducer);

	return <div className='mt-8 mb-16 text-center py-5 px-4'>
		<h3 className='font-bold mb-4 text-3xl'>
			{ lang === Language.UA ? 'Дякуємо за замовлення!' : 'Спасибо за заказ!' }
		</h3>
		<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" className="mx-auto fill-green-300" height="150" width="150" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd"
						d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z"
						clipRule="evenodd"></path>
			<path fillRule="evenodd"
						d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z"
						clipRule="evenodd"></path>
		</svg>
		{ quickOrder && <p className='mb-8 mt-4 font-bold text-xl'>
			{lang === Language.UA ? 'Найближчим часом з Вами зв\'яжеться менеджер' : 'В ближайшее время с Вами свяжется менеджер'}
		</p> }
		<Link to={`/`} className='pl-2 pr-2 text-blue-500 hover:underline '>
			{lang === Language.UA ? 'Повернутися на головну' : 'Вернуться на главную'}
		</Link>
	</div>
};
