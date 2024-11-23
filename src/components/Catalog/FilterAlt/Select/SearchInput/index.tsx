import { FC } from 'react';

import { useAppTranslation } from '../../../../../hooks';
import { SearchIcon } from '../../../../Lib/Icons';

interface SearchInputProps {
	value: string
	handleChange: (value: string) => void
}

export const SearchInput: FC<SearchInputProps> = ({ value, handleChange }) => {
	const t = useAppTranslation();

	return <div className='mb-2 pl-2.5 pr-4 text-gray-900'>
		<label className='relative group' htmlFor="">
			<SearchIcon className='fill-gray-500 absolute left-2 top-1/2 -translate-y-1/2'/>
			<input
				type="text"
				value={ value }
				onChange={ event => handleChange(event.target.value) }
				placeholder={ t('search', true) }
				className='py-2 pl-10 pr-2 w-full border border-[#A9ACB2] rounded-sm focus:border-blue-500'
			/>
		</label>
	</div>
};
