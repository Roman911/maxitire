import { FC, memo } from 'react';
import DOMPurify from 'dompurify';

import { Link } from '../../../lib';
import { useAppSelector, useAppTranslation } from '../../../hooks';
import { Contacts } from '../../../containers/Contacts';
import { Language } from '../../../models/language';

import paymentIcon from '../../../assets/icons/payment-icon.svg';
import payment2Icon from '../../../assets/icons/payment2-icon.svg';
import guaranteeIcon from '../../../assets/icons/guarantee-icon.svg';
import returnIcon from '../../../assets/icons/return-icon.svg';
import calendarIcon from '../../../assets/icons/calendar-icon.svg';

interface InfoBlockProps {
	handleModalOpen: (type: 'QuickOrder' | 'OnlineInstallment' | 'DeliveryCalculation' | 'Callback' | 'AddAsk') => void
}

export const InfoBlock: FC<InfoBlockProps> = ({ handleModalOpen }) => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);
	const t = useAppTranslation();

	const HtmlContent = memo(({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString);
		return (
			<div
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		);
	});

	return <div className='2xl:w-64'>
		<div className='grid sm:grid-cols-3 2xl:grid-cols-1 bg-white rounded-sm border border-gray-200 px-5'>
			<div className='border-b border-gray-200 pb-4'>
				<Link to='/page/garantiya-ta-povernennya' className='mt-4 flex items-center gap-x-2.5 font-medium hover:text-blue-500 group'>
					<img src={guaranteeIcon} alt=""/>
					<span className='underline'>{ t('guarantee', true) }</span>
				</Link>
				<Link to='/page/payment' className='mt-4 flex items-center gap-x-2.5 font-medium hover:text-blue-500 group'>
					<img src={paymentIcon} alt=""/>
					<span className='underline'>Оплата</span>
				</Link>
				<button onClick={() => handleModalOpen('OnlineInstallment')} className='mt-4 flex items-center gap-x-2.5 font-medium hover:text-blue-500 group'>
					<img src={payment2Icon} alt=""/>
					<span className='underline'>{ t('payment in installments', true) }</span>
				</button>
				<Link to='/page/garantiya-ta-povernennya' className='mt-4 flex items-center gap-x-2.5 font-medium hover:text-blue-500 group'>
					<img src={returnIcon} alt=""/>
					<span className='underline'>{t('refund', true)}</span>
				</Link>
			</div>
			<div className='mt-5 text-sm  leading-9 whitespace-pre-wrap border-b border-gray-200 pb-4'>
				<h5 className='text-lg font-bold'>{lang === Language.UA ? 'Контакти' : 'Контакты'}</h5>
				{settings[lang].config_address && <HtmlContent htmlString={settings[lang].config_address}/>}
				<Contacts isInfoBlock={ true } />
				<div className='flex items-center'>
					<img src={calendarIcon} alt=""/>
					{settings[lang].config_open && <HtmlContent htmlString={settings[lang].config_open}/>}
				</div>
			</div>
			<div className='mt-5 text-sm mb-4 leading-9 whitespace-pre-wrap'>
				<h5 className='text-lg font-bold'>
					{lang === Language.UA ? 'Доставка по Україні' : 'Доставка по Украине'}
				</h5>
				{settings[lang].config_punct && <HtmlContent htmlString={settings[lang].config_punct}/>}
				<p className='mt-3'><strong>
					{lang === Language.UA ? '1-3 дні (від 85 грн)' : '1-3 дня (от 85 грн)'}
				</strong></p>
				<p className='mt-3'>{lang === Language.UA ? 'Нова Пошта' : 'Новая Почта'}</p>
				<p>{lang === Language.UA ? 'УкрПошта' : 'УкрПочта'}</p>
			</div>
		</div>
	</div>
};
