import { memo } from 'react';
import DOMPurify from 'dompurify';

import { config } from '../../../config';
import { baseDataAPI } from '../../../services/baseDataService';
import { Link } from '../../../lib';
import { useAppSelector, useAppTranslation } from '../../../hooks';
import { EmailIcon, FacebookIcon, TelegramIcon, ViberIcon } from '../../Lib/Icons';
import { linksCatalog } from './linksCatalog';
import styles from './index.module.scss';

import kievstarLogo from '../../../assets/kievstar-logo.png';
import vodafoneLogo from '../../../assets/vodafone-logo.png';

import { PhoneLogo } from '../../../models/config';
import { Language} from "../../../containers/Layout/Header/Language";
import logo from '../../../assets/logo-footer.svg';
type IconType = 'telegram' | 'facebook' | 'viber';

const phoneLogos: Record<PhoneLogo, string> = {
	vodafone: vodafoneLogo,
	kievstar: kievstarLogo,
};

export const Footer = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);
	const { data } = baseDataAPI.useFetchStatiAliasAllQuery('');
	const t = useAppTranslation();

	const icons: Record<IconType, JSX.Element> = {
		telegram: <TelegramIcon className='fill-black group-hover:fill-white' />,
		facebook: <FacebookIcon className='fill-black group-hover:fill-white' />,
		viber: <ViberIcon className='fill-black group-hover:fill-white' />,
	};

	const link = (link: string, title: string, index: number) => {
		return <Link key={ index } className='text-white block text-sm font-medium mt-4 transition hover:text-[#0091E5]' to={ link } >
			{ t(title, true) }
		</Link>
	}

	const telephones: { phone: string; url: string; logo: "vodafone" | "kievstar" | "lifecell"; }[] = [
		{ phone: settings[lang].config_telephone_vodafone, url: settings[lang].config_telephone_vodafone_url, logo: 'vodafone' },
		{ phone: settings[lang].config_telephone_kievstar, url: settings[lang].config_telephone_kievstar_url, logo: 'kievstar' },
		{ phone: settings[lang].config_telephone_life, url: settings[lang].config_telephone_life_url, logo: 'lifecell' },
	];

	const HtmlContent = memo(({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString);
		return (
			<div
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		);
	});

	return <footer className={styles['footer']}>
		<div className='bg-black/75'>
			<div className='container mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
				<div>
					<Link to='/' className='logo max-w-40 md:max-w-48 lg:w-auto'>
						<img src={logo} className="logo" alt="logo"/>
					</Link>
					<div className='flex gap-x-5 mt-7'>
						{config.social.links.map((item, index) => {
							return <a
								key={index}
								target='_blank'
								href={item.link}
								className='w-9 h-9 rounded-full cursor-pointer bg-white flex items-center justify-center transition group hover:bg-blue-500'
							>
								{icons[item.logo as IconType]}
							</a>
						})}
					</div>
					<p className='text-gray-500 mt-7 leading-6 text-sm'>
						© {new Date().getFullYear() + ' ' + settings[lang].config_owner}.<br/>
						{lang === 'ua' ? 'Всі права захищені.' : 'Все права защищены.'}
					</p>
				</div>
				<div>
					<h6 className='text-gray-500 text-sm font-bold'>{t('contacts', true)}</h6>
					{telephones.map((item, index) => {
						if(item.phone) {
							return <div key={index} className='flex items-center mt-5'>
								<img src={phoneLogos[item.logo]} alt={item.logo + '-logo'}/>
								<a href={`tel:${item.url}`} className='ml-2.5 text-sm text-white'>
									{item.phone}
								</a>
							</div>
						}
					})}
					<div className='flex items-center mt-5'>
						<EmailIcon className='fill-white'/>
						<a href={`mailto:${settings[lang].config_email}`} className='ml-2.5 text-sm text-white'>
							{settings[lang].config_email}
						</a>
					</div>
					<div className='text-white mt-5'>
						{settings[lang].config_address && <HtmlContent htmlString={settings[lang].config_address}/>}
						{settings[lang].config_open && <HtmlContent htmlString={settings[lang].config_open}/>}
					</div>
				</div>
				<div>
					<h6 className='text-gray-500 text-sm font-bold mb-7'>Каталог</h6>
					{linksCatalog.map((item, index) => {
						return link(item.link, item.title, index)
					})}
				</div>
				<div>
					<h6 className='text-gray-500 text-sm font-bold mb-7'>{t('information', true)}</h6>
					{data?.footer.map((item, index) => {
						return link(`/page/${item.slug}`, item.descriptions[lang].title, index)
					})}
				</div>
				<Language/>
			</div>
		</div>
	</footer>
};
