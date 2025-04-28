import { FC, type MouseEvent, RefObject } from 'react';
import { twMerge } from 'tailwind-merge';

import vodafoneLogo from '../../assets/vodafone-logo.webp';
import kievstarLogo from '../../assets/kievstar-logo.webp';

import { PhoneLogo } from '../../models/config';

const phoneLogos: Record<PhoneLogo, string> = {
	vodafone: vodafoneLogo,
	kievstar: kievstarLogo,
};

interface ContactsProps {
	isInfoBlock?: boolean
	className?: string
	showOptions: boolean
	handleClick: (event: MouseEvent<HTMLButtonElement>) => void
	label: string
	tooltipRef: RefObject<HTMLDivElement>
	telephones: {
		phone: string
		url: string
		logo: 'vodafone' | 'kievstar' | 'lifecell'
	}[]
}

export const ContactsComponent: FC<ContactsProps> = (
	{
		isInfoBlock,
		className,
		showOptions,
		handleClick,
		label,
		tooltipRef,
		telephones
	}) => {
	return <div className={ className }>
		<div className={ twMerge('relative', isInfoBlock ? 'mt-6 w-full' : 'mx-auto max-w-max') }>
			<button
				type="button" onClick={ event => handleClick(event) }
				className={
					twMerge('flex items-center justify-center gap-x-2.5 lg:gap-x-1.5 text-sm outline-none group', !isInfoBlock && 'w-full') }
				id='menu-button'
			>
				<div className={ twMerge(!isInfoBlock && 'bg-blue-500 lg:bg-transparent p-2 lg:p-0 rounded-full') }>
					<i className='icon iconfont-phone'></i>
				</div>
				{ isInfoBlock ?
					<div
						className={ twMerge('font-bold uppercase group-hover:text-blue-500', showOptions && 'text-blue-500') }>
						{ label }
					</div> : <>
						<div className='font-bold hidden lg:block'>
							<a href={ `tel:${ telephones[1].url }` }>
								{ telephones[1].phone }
							</a>
						</div>
					</> }
				<div className={ twMerge('transition-transform', showOptions && 'rotate-180') }>
					<i className={ twMerge('icon iconfont-chevron-down', isInfoBlock ? 'text-black' : 'text-white') }></i>
				</div>
			</button>
			<div
				ref={ tooltipRef }
				className={
					twMerge('absolute left-0 lg:left-auto lg:-right-10 z-10 mt-2 py-2 origin-top-right border border-gray-200 ' +
						'bg-white shadow-lg px-5 rounded-sm', isInfoBlock ? 'w-56' : 'w-48', !showOptions && 'hidden') }
				role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={ -1 }>
				<div className="py-1 text-black" role="none">
					{ telephones.map((item, index) => {
						if(item.phone) {
							return <div key={ index } className='flex items-center my-3'>
								<img src={ phoneLogos[item.logo] } alt={ item.logo + '-logo' }/>
								<a href={ `tel:${ item.url }` } className='ml-2.5 font-medium'>
									{ item.phone }
								</a>
							</div>
						}
						return null;
					}) }
				</div>
			</div>
		</div>
	</div>
};
