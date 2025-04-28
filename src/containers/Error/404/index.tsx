import { useRouteError } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';
import { Language } from '../../../models/language';
import { Link } from '../../../lib';

import carWheel from '../../../assets/car-wheel.webp';

export const ErrorPage = () => {
	const error = useRouteError();
	const { lang } = useAppSelector(state => state.langReducer);

	console.log('error', error)

	return <div className='min-h-96 bg-white py-10 px-6'>
		<div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4'>
			<div className='mt-16 col-span-2 ml-auto'>
				<h2
					className='text-5xl mb-10 text-center md:text-start'>404 {lang === Language.UA ? 'Сторінку не знайдено' : 'Страница не найдена'}</h2>
				<p className='text-lg'>
					{
						lang === Language.UA ?
							'Можливо ця сторінка була вилучена або допущена помилка в адресі Скористайтесь пошуком або поверніться ' :
							'Возможно эта страница была удалена или допущена ошибка в адресе Воспользуйтесь поиском или вернитесь '
					}
					<Link className='text-blue-500 uppercase font-semibold hover:underline'
								to={`/`}>{lang === Language.UA ? 'На головну сторінку' : 'На главную страницу'}</Link>
				</p>
			</div>
			<img src={carWheel} alt=""/>
		</div>
	</div>
};
