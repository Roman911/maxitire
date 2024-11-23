import { useAppSelector } from '../../../hooks';
import { PhoneMaskInput } from '../../Lib';

import imgSupport from '../../../assets/home-support.png';

export const SupportComponent = () => {
	const { lang } = useAppSelector(state => state.langReducer);

	return <div className='mt-56 md:mt-16 bg-[#EAF1FF] flex justify-between flex-col-reverse md:flex-row px-8 md:px-20 relative'>
		<div className='py-10 flex justify-center flex-col'>
			<h3 className='text-4xl font-bold'>
				{lang === 'ua' ? 'Потрібна допомога?' : 'Нужна помощь?'}
			</h3>
			<p className='text-xl mt-6'>{lang === 'ua' ? 'Зверніться до наших експертів' : 'Обратитесь к нашим экспертам'}</p>
			<div className='flex items-center mt-8'>
				<div>
					<PhoneMaskInput isSupport={ true } />
				</div>
				<button type='submit' className='btn primary -ml-2 relative'>
					{lang === 'ua' ? 'Замовити дзвінок' : 'Заказать звонок'}
				</button>
			</div>
		</div>
		<div className='absolute md:static bottom-full left-2/4 -translate-x-2/4 md:translate-x-0 max-w-72 md:max-w-max'>
			<img className='-mt-3 ' src={imgSupport} alt=""/>
		</div>
	</div>
};
