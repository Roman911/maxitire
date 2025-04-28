import { Link } from '../../../lib';
import { useAppSelector, useAppTranslation } from '../../../hooks';
import { Contacts } from '../../../containers/Contacts';

import deliveryIcon from '../../../assets/icons/delivery-icon.svg';
import paymentIcon from '../../../assets/icons/payment-icon.svg';
import guaranteeIcon from '../../../assets/icons/guarantee-icon.svg';

export const InfoBlock = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);
	const t = useAppTranslation();

	return <div className='lg:w-64'>
		<div className=' bg-white rounded-2xl px-5 py-7'>
			<div className='font-bold'>{lang === 'ua' ? 'Замовляйте за номерами:' : 'Заказывайте по номерам:'}</div>
			<Contacts isInfoBlock={ true } />
			<div className='flex items-center gap-x-2.5 mt-5'>
				<i className='icon iconfont-email'></i>
				<a href={`mailto:${settings.ua.config_email}`} className='ml-2.5 font-bold'>
					{settings.ua.config_email}
				</a>
			</div>
			<div className='mt-5 text-sm pb-4 border-b border-[#D8D8D9] leading-9 whitespace-pre-wrap'>
				{ settings[lang].config_address }
			</div>
			<Link to='/page/shipment' className='mt-6 flex items-center gap-x-2.5 font-medium text-blue-500 group'>
				<img src={ deliveryIcon } alt=""/>
				<span className='group-hover:underline'>Доставка</span>
			</Link>
			<Link to='/page/payment' className='mt-6 flex items-center gap-x-2.5 font-medium text-blue-500 group'>
				<img src={ paymentIcon } alt=""/>
				<span className='group-hover:underline'>Оплата</span>
			</Link>
			<Link to='/page/garantiya-ta-povernennya' className='mt-6 flex items-center gap-x-2.5 font-medium text-blue-500 group'>
				<img src={ guaranteeIcon } alt=""/>
				<span className='group-hover:underline'>{t('warranty and returns', true)}</span>
			</Link>
		</div>
	</div>
};
