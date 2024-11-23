import { FC, RefObject, type MouseEvent } from 'react';
import classNames from 'classnames';

import { ChevronDownIcon, PhoneIcon } from '../Lib/Icons';

import vodafoneLogo from '../../assets/vodafone-logo.png';
import kievstarLogo from '../../assets/kievstar-logo.png';

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
	return <div className={className}>
		<div className={classNames('relative', { 'mx-auto max-w-max': !isInfoBlock }, { 'mt-6 w-full': isInfoBlock })}>
			<button type="button" onClick={event => handleClick(event)}
							className={classNames('flex items-center justify-center gap-x-2.5 lg:gap-x-1.5 text-sm outline-none group', { 'w-full': !isInfoBlock })}
							id='menu-button'>
				<div className={classNames({'bg-blue-500 lg:bg-transparent p-2 lg:p-0 rounded-full': !isInfoBlock})}>
					<PhoneIcon className={classNames({'fill-white lg:fill-blue-500': !isInfoBlock, 'fill-blue-500': isInfoBlock})}/>
				</div>
				{isInfoBlock ?
					<div className={classNames('font-bold uppercase group-hover:text-blue-500', {'text-blue-500': showOptions})}>
						{ label }
					</div> : <>
						<div className='font-bold hidden lg:block'>
							<a href={`tel:${telephones[1].url}`}>
								{telephones[1].phone}
							</a>
						</div>
					</>}
				<div className={classNames('transition-transform', {'rotate-180': showOptions})}>
					<ChevronDownIcon className={classNames({'stroke-white': !isInfoBlock, 'stroke-black': isInfoBlock})}/>
				</div>
			</button>
			<div
				ref={ tooltipRef }
				className={
					classNames('absolute left-0 lg:left-auto lg:-right-10 z-10 mt-2 py-2 origin-top-right border border-gray-200 bg-white shadow-lg px-5 rounded-sm',
						{ hidden: !showOptions, 'w-48': !isInfoBlock, 'w-56': isInfoBlock }
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
	</div>
};
