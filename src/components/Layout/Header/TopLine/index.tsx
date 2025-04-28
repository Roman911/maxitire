import { config } from '../../../../config';
import { useAppTranslation } from '../../../../hooks';

import vodafoneLogo from '../../../../assets/vodafone-logo.webp';
import kievstarLogo from '../../../../assets/kievstar-logo.webp';

import { PhoneLogo } from '../../../../models/config';

const phoneLogos: Record<PhoneLogo, string> = {
	vodafone: vodafoneLogo,
	kievstar: kievstarLogo,
};

export const TopLine = () => {
	const t = useAppTranslation();

	return <div className='bg-black text-white font-medium py-3'>
		<div className='container max-w-6xl mx-auto grid grid-cols-2 py-1 px-4'>
			<div className='flex items-center gap-x-6'>
				<div>{t('light', true)} {t('tires')}</div>
				{config.contacts.passengerTires.map((item, index) => {
					return <a key={ index } href={`tel:${item.phoneUrl}`} className='flex items-center gap-x-1.5'>
						{<img src={phoneLogos[item.logo]} alt={item.logo + '-logo'}/>}
						<span>{item.phone}</span><span>{item.manager}</span>
					</a>
				})}
			</div>
			<div className='flex items-center gap-x-6 justify-end'>
				<div>{t('cargo', true)} {t('tires')}</div>
				{config.contacts.truckTires.map((item, index) => {
					return <a key={ index } href={`tel:${item.phoneUrl}`} className='flex items-center gap-x-1.5'>
						{<img src={phoneLogos[item.logo]} alt={item.logo + '-logo'}/>}
						<span>{item.phone}</span><span>{item.manager}</span>
					</a>
				})}
			</div>
			<div className='flex items-center gap-x-6 col-span-2 text-center justify-center mt-3'>
				<div>{t('tire repair', true)}</div>
				{config.contacts.truckTires.map((item, index) => {
					return <a key={ index } href={`tel:${item.phoneUrl}`} className='flex items-center gap-x-1.5'>
						{<img src={phoneLogos[item.logo]} alt={item.logo + '-logo'}/>}
						<span>{item.phone}</span><span>{item.manager}</span>
					</a>
				})}
			</div>
		</div>
	</div>
};
