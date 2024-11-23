import { FC } from 'react';

import { FilterIcon } from '../../../Lib/Icons';

interface FilterBtnProps {
	openFilter: () => void
	title: string
}

export const FilterBtn: FC<FilterBtnProps> = ({ openFilter, title }) => {
	return <button
		onClick={() => openFilter()}
		className='lg:hidden flex items-center font-bold gap-x-2.5'
	>
		<FilterIcon/>
		{ title }
	</button>
};
