import { FC, type MouseEvent, useRef, useState } from 'react';
import { FacebookShareButton, TelegramShareButton, ViberShareButton, TwitterShareButton, EmailShareButton } from 'react-share';
import classNames from 'classnames';

import { Link } from '../../../lib';
import { CalculatorIcon, HeartIcon, LibraIcon, MailIcon, PhoneCircuitIcon, ShareIcon } from '../../Lib/Icons';
import {useAppSelector, useClickOutside} from '../../../hooks';

import vodafoneLogo from '../../../assets/vodafone-logo.png';
import kievstarLogo from '../../../assets/kievstar-logo.png';
import lifecellLogo from '../../../assets/life-logo.png';

import { PhoneLogo } from '../../../models/config';

const phoneLogos: Record<PhoneLogo, string> = {
	vodafone: vodafoneLogo,
	kievstar: kievstarLogo,
	lifecell: lifecellLogo,
};

interface ActionsBlockProps {
	className: string
	isBookmarks: boolean
	isComparison: boolean
	handleClickBookmarks: () => void
	handleClickComparison: () => void
	openModal: (type: 'QuickOrder' | 'OnlineInstallment' | 'DeliveryCalculation' | 'Callback' | 'AddAsk') => void
}

export const ActionsBlockComponent: FC<ActionsBlockProps> = ({ className, isBookmarks, isComparison, handleClickBookmarks, handleClickComparison, openModal }) => {
	const [ showOptions, setShowOptions ] = useState<boolean>(false);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);
	const url = window.location.href;

	const closeFilter = () => {
		setShowOptions(false);
	}

	useClickOutside({ ref: tooltipRef, open: showOptions, onClose: closeFilter });

	const telephones: { phone: string; url: string; logo: "vodafone" | "kievstar" | "lifecell"; }[] = [
		{ phone: settings[lang].config_telephone_vodafone, url: settings[lang].config_telephone_vodafone_url, logo: 'vodafone' },
		{ phone: settings[lang].config_telephone_kievstar, url: settings[lang].config_telephone_kievstar_url, logo: 'kievstar' },
		{ phone: settings[lang].config_telephone_life, url: settings[lang].config_telephone_life_url, logo: 'lifecell' },
	];

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setShowOptions(prev => !prev);
	}

	return <div className={classNames('gap-1.5 xl:gap-2.5 h-full items-center', className)}>
		<div className='relative'>
			<button onClick={event => handleClick(event)} className='group relative'>
				<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
				<span className="relative inline-flex rounded-full w-12 h-12 bg-sky-500 p-3">
				<PhoneCircuitIcon className='stroke-white w-6 h-6'/>
			</span>
			</button>
			<div
				ref={tooltipRef}
				className={
					classNames('absolute left-0 z-10 mt-2 origin-top-right border border-gray-200 bg-white shadow-lg px-5 rounded-sm w-48 py-2',
						{hidden: !showOptions}
					)}
				role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
				<div className="py-1 text-black" role="none">
					{telephones.map((item, index) => {
						if(item.phone) {
							return <div key={index} className='flex items-center my-3'>
								<img src={phoneLogos[item.logo]} alt={item.logo + '-logo'}/>
								<a href={`tel:${item.url}`} className='ml-2.5 font-medium'>
									{item.phone}
								</a>
							</div>
						}
						return null;
					})}
				</div>
			</div>
		</div>
		<button onClick={() => openModal('AddAsk')} className='p-3 bg-blue-50 rounded-full group'>
			<MailIcon className='stroke-gray-500 group-hover:stroke-blue-500 w-6 h-6'/>
		</button>
		<button onClick={() => handleClickBookmarks()} className='p-3 bg-blue-50 rounded-full group'>
			<HeartIcon className={classNames('group-hover:stroke-blue-500 w-6 h-6', {
				'stroke-blue-500 fill-blue-500': isBookmarks,
				'stroke-gray-500': !isBookmarks
			})}/>
		</button>
		<button onClick={() => handleClickComparison()} className='p-3 bg-blue-50 rounded-full group'>
			<LibraIcon
				className={classNames('group-hover:fill-blue-500 w-6 h-6', {
					'fill-blue-500': isComparison,
					'fill-gray-500': !isComparison
				})}/>
		</button>
		<Link to={'/tyre-disk-size-calc'} className='p-3 bg-blue-50 rounded-full group'>
			<CalculatorIcon
				className={classNames('group-hover:fill-blue-500 w-6 h-6', {
					'fill-blue-500': isComparison,
					'fill-gray-500': !isComparison
				})}/>
		</Link>
		<div className='p-3 bg-blue-50 rounded-full group cursor-pointer relative'>
			<ShareIcon className='fill-gray-500 group-hover:fill-blue-500 w-6 h-6'/>
			<div className='absolute top-10 md:left-0 right-0 md:right-auto bg-white rounded shadow-md py-4 px-6 hidden group-hover:block'>
				<FacebookShareButton url={url} className='flex items-center gap-x-2'>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='fill-blue-500 w-5'>
						<path
							d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/>
					</svg>
					<span className='text-sm font-semibold'>
						Facebook
					</span>
				</FacebookShareButton>
				<TelegramShareButton url={url} className='mt-3 flex items-center gap-x-2'>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className='fill-blue-500 w-5'>
						<path
							d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/>
					</svg>
					<span className='text-sm font-semibold'>
						Telegram
					</span>
				</TelegramShareButton>
				<ViberShareButton url={url} className='mt-3 flex items-center gap-x-2'>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='fill-violet-900 w-5'>
						<path
							d="M444 49.9C431.3 38.2 379.9 .9 265.3 .4c0 0-135.1-8.1-200.9 52.3C27.8 89.3 14.9 143 13.5 209.5c-1.4 66.5-3.1 191.1 117 224.9h.1l-.1 51.6s-.8 20.9 13 25.1c16.6 5.2 26.4-10.7 42.3-27.8 8.7-9.4 20.7-23.2 29.8-33.7 82.2 6.9 145.3-8.9 152.5-11.2 16.6-5.4 110.5-17.4 125.7-142 15.8-128.6-7.6-209.8-49.8-246.5zM457.9 287c-12.9 104-89 110.6-103 115.1-6 1.9-61.5 15.7-131.2 11.2 0 0-52 62.7-68.2 79-5.3 5.3-11.1 4.8-11-5.7 0-6.9 .4-85.7 .4-85.7-.1 0-.1 0 0 0-101.8-28.2-95.8-134.3-94.7-189.8 1.1-55.5 11.6-101 42.6-131.6 55.7-50.5 170.4-43 170.4-43 96.9 .4 143.3 29.6 154.1 39.4 35.7 30.6 53.9 103.8 40.6 211.1zm-139-80.8c.4 8.6-12.5 9.2-12.9 .6-1.1-22-11.4-32.7-32.6-33.9-8.6-.5-7.8-13.4 .7-12.9 27.9 1.5 43.4 17.5 44.8 46.2zm20.3 11.3c1-42.4-25.5-75.6-75.8-79.3-8.5-.6-7.6-13.5 .9-12.9 58 4.2 88.9 44.1 87.8 92.5-.1 8.6-13.1 8.2-12.9-.3zm47 13.4c.1 8.6-12.9 8.7-12.9 .1-.6-81.5-54.9-125.9-120.8-126.4-8.5-.1-8.5-12.9 0-12.9 73.7 .5 133 51.4 133.7 139.2zM374.9 329v.2c-10.8 19-31 40-51.8 33.3l-.2-.3c-21.1-5.9-70.8-31.5-102.2-56.5-16.2-12.8-31-27.9-42.4-42.4-10.3-12.9-20.7-28.2-30.8-46.6-21.3-38.5-26-55.7-26-55.7-6.7-20.8 14.2-41 33.3-51.8h.2c9.2-4.8 18-3.2 23.9 3.9 0 0 12.4 14.8 17.7 22.1 5 6.8 11.7 17.7 15.2 23.8 6.1 10.9 2.3 22-3.7 26.6l-12 9.6c-6.1 4.9-5.3 14-5.3 14s17.8 67.3 84.3 84.3c0 0 9.1 .8 14-5.3l9.6-12c4.6-6 15.7-9.8 26.6-3.7 14.7 8.3 33.4 21.2 45.8 32.9 7 5.7 8.6 14.4 3.8 23.6z"/>
					</svg>
					<span className='text-sm font-semibold'>
						Viber
					</span>
				</ViberShareButton>
				<TwitterShareButton url={url} className='mt-3 flex items-center gap-x-2'>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='fill-blue-500 w-5'>
						<path
							d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM351.3 199.3v0c0 86.7-66 186.6-186.6 186.6c-37.2 0-71.7-10.8-100.7-29.4c5.3 .6 10.4 .8 15.8 .8c30.7 0 58.9-10.4 81.4-28c-28.8-.6-53-19.5-61.3-45.5c10.1 1.5 19.2 1.5 29.6-1.2c-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3c-9-6-16.4-14.1-21.5-23.6s-7.8-20.2-7.7-31c0-12.2 3.2-23.4 8.9-33.1c32.3 39.8 80.8 65.8 135.2 68.6c-9.3-44.5 24-80.6 64-80.6c18.9 0 35.9 7.9 47.9 20.7c14.8-2.8 29-8.3 41.6-15.8c-4.9 15.2-15.2 28-28.8 36.1c13.2-1.4 26-5.1 37.8-10.2c-8.9 13.1-20.1 24.7-32.9 34c.2 2.8 .2 5.7 .2 8.5z"/>
					</svg>
					<span className='text-sm font-semibold'>
						Twitter
					</span>
				</TwitterShareButton>
				<EmailShareButton url={url} className='mt-3 flex items-center gap-x-2'>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='fill-gray-700 w-4'>
						<path
							d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"/>
					</svg>
					<span className='text-sm font-semibold'>
						Поштою
					</span>
				</EmailShareButton>
				<button onClick={() => navigator.clipboard.writeText(url)}
								className='flex mt-3 items-center gap-x-2 text-sm font-semibold'>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='fill-gray-700 w-4'>
						<path
							d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"/>
					</svg>
					Скопіювати
				</button>
			</div>
		</div>
	</div>
};
