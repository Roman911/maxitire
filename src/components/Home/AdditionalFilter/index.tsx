import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import { useAppTranslation } from '../../../hooks';
import { Section } from '../../../models/filter';

import tire from '../../../assets/additional-filter-tire.png';
import disk from '../../../assets/additional-filter-disk.png';

interface AdditionalFilterProps {
	children: ReactNode;
	section: Section
	additionalFilter: 'tires' | 'disks'
	onChangeFilter: (name: 'tires' | 'disks', section: Section) => void
}

export const AdditionalFilterComponent: FC<AdditionalFilterProps> = ({ children, additionalFilter, section, onChangeFilter }) => {
	const t = useAppTranslation();

	return <div className='mt-10'>
		<img className='mx-auto' src={ additionalFilter === 'tires' ? tire : disk } alt=""/>
		<div className={
			classNames('pt-20 py-6 px-5 border',
				{
					'rounded-l-sm bg-blue-500 border-blue-500': additionalFilter === 'tires',
					'rounded-r-sm bg-white border-[#DCE1E5]': additionalFilter === 'disks'
				}
			)}>
			<div className={classNames('max-w-xl mx-auto md:flex md:justify-between items-end', {'text-white': additionalFilter === 'tires'})}>
				<h2 className='text-3xl font-bold uppercase'>
					{t(section, true)}
				</h2>
				<div className='flex font-semibold gap-x-5 mt-3 md:mt-0'>
					<button
						onClick={ () => { onChangeFilter(additionalFilter, Section.Tires) }}
						className={classNames('hover:underline hover:opacity-100',{ 'underline': section !== Section.Car, 'opacity-60': section === Section.Car })}
					>
						{t('by parameters', true)}
					</button>
					<button
						onClick={ () => { onChangeFilter(additionalFilter, Section.Car) }}
						className={classNames('hover:underline hover:opacity-100', { 'underline': section === Section.Car, 'opacity-60': section !== Section.Car })}
					>
						{t('by car', true)}
					</button>
				</div>
			</div>
			<div className='max-w-xl mx-auto mt-4'>
				{children}
			</div>
		</div>
	</div>
};
