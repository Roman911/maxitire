import { FC, useState } from 'react';
import classNames from 'classnames';

import { useAppSelector, useAppTranslation } from '../../../hooks';

import { TypeCarLinks } from '../../Lib/TypeCarLinks';
import { FilterBtn } from './FilterBtn';
import { ChevronDownIcon } from '../../Lib/Icons';
import { Section } from '../../../models/filter';

const options = [
	{ label: 'cheap at first', param1: 'order[asc]', param2: '1', title: 'cheap at first' },
	{ label: 'expensive at first', param1: 'order[asc]', param2: '0', title: 'expensive at first' },
	{ label: 'by popularity', param1: 'order[value]=popular&order[asc]', param2: '0', title: 'by popularity' },
	{ label: 'by number of offers', param1: 'order[value]', param2: 'offers', title: 'by number of offers' },
];

interface FilterByCarProps {
	openFilter: () => void
	handleClick: (param1: string, param2: string) => void
}

export const FilterByCar: FC<FilterByCarProps> = ({ openFilter, handleClick }) => {
	const [ openSort, setOpenSort ] = useState(false);
	const [ sort, setSort ] = useState('sorting');
	const { section, subsection } = useAppSelector(state => state.filterReducer);
	const t = useAppTranslation();

	const onClick = (label: string, param1: string, param2: string) => {
		setSort(label);
		setOpenSort(false);
		handleClick(param1, param2);
	}

	return <div className='flex justify-between lg:justify-end items-center lg:items-start mb-3'>
		{subsection === 'byParams' && section === Section.Tires && <div className='hidden lg:flex gap-x-3 xl:gap-x-6 mr-3 xl:mr-8'>
			<TypeCarLinks section='catalog' />
		</div>}
		<FilterBtn openFilter={ openFilter } title={ t('filters', true) } />
		<div className="relative inline-block text-left">
			<button type="button" onClick={() => setOpenSort(prev => !prev)}
							className="w-56 xl:w-64 h-11 p-3 flex items-center justify-between bg-white text-xs uppercase font-bold border border-gray-200 rounded-sm"
							id="menu-button" aria-expanded="true" aria-haspopup="true">
				<div>{t(sort, true)}</div>
				<div className={classNames('transition-transform', {'rotate-180': openSort})}>
					<ChevronDownIcon/>
				</div>
			</button>
			<div
				className={classNames('absolute right-0 z-10 w-56 xl:w-64 origin-top-right border border-gray-200 bg-white shadow-lg p-3 xl:p-5 rounded-sm', { hidden: !openSort })}
				tabIndex={-1}>
				<div className="py-1 text-sm xl:text-base">
					{ options.map((item, index) => {
						return <button
							key={ index }
							className={classNames('flex items-center', { 'mt-3': index !== 0 })}
							onClick={() => onClick(item.label, item.param1, item.param2)}
						>
							{ t(item.title, true) }
						</button>
					})}
				</div>
			</div>
		</div>
	</div>
};
