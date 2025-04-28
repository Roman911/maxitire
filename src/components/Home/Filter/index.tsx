import { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAppDispatch, useAppTranslation } from '../../../hooks';
import { changeSection } from '../../../store/reducers/filterSlice';

import { Tab } from './Tab';
import { TiresFilter } from './TiresFilter';
import { DisksFilter } from './DisksFilter';
import { FilterByCar } from '../../../containers/Home/FilterByCar';

import { Section } from '../../../models/filter';
import type { Options } from '../../../models/baseData';
import type { OnChange } from '../../../models/filterHomePage';

interface IFilterProps {
	section: Section
	data: {
		focusValue?: string
		label: string
		name: string
		options: Options[] | undefined
	}[]
	onChange: OnChange
	onSubmit: () => void
	additionalFilter?: 'tires' | 'disks'
}

export const FilterComponent: FC<IFilterProps> = (
	{ data, section, onChange, onSubmit, additionalFilter }
)  => {
	const [ isOpen, setOpen ] = useState(false);
	const dispatch = useAppDispatch();
	const t = useAppTranslation();

	const handleClick = (value: Section) => {
		const newOpenState = !(section === value && isOpen);
		setOpen(newOpenState);
		dispatch(changeSection(newOpenState ? value : Section.Tires));
	};

	const renderFilter = () => {
		switch(section) {
			case Section.Disks:
				return <DisksFilter
					filters={ data } onChange={ onChange } onSubmit={ onSubmit } additionalFilter={ additionalFilter }
				/>;
			case Section.Car:
				return <FilterByCar additionalFilter={ additionalFilter }/>;
			default:
				return <TiresFilter
					filters={ data } onChange={ onChange } onSubmit={ onSubmit } additionalFilter={ additionalFilter }
				/>;
		}
	};

	return <section className='bg-tires lg:flex md:h-[820px] relative'>
		<div
			className={ twMerge(!additionalFilter &&
				'container max-w-6xl mx-auto py-6 lg:py-10 xl:py-12 px-4 lg:px-10 absolute top-1/2 left-1/2 -translate-y-1/2 ' +
				'-translate-x-1/2 bg-[#00000066] rounded-lg')
		}>
			<div className={ twMerge('mb-8 flex justify-center gap-x-2.5 text-blue-300', additionalFilter && 'hidden') }>
				<Tab name={ Section.Tires } section={ section } isOpen={ isOpen } handleClick={ handleClick } label={ t('tires') }/>
				<Tab name={ Section.Disks } section={ section } isOpen={ isOpen } handleClick={ handleClick } label={ t('disks') }/>
				<Tab name={ Section.Car } section={ section } isOpen={ isOpen } handleClick={ handleClick } label={ t('by car') }/>
				<Tab name={ Section.Car } section={ section } isOpen={ isOpen } handleClick={ handleClick } label='вантажні шини'/>
			</div>
			<div className="">{ renderFilter() }</div>
		</div>
	</section>
};
