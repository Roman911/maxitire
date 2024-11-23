import { FC, ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';

import styles from '../HeaderCenter/index.module.scss';
import { useAppSelector } from '../../../../hooks';
import { Link } from '../../../../lib';
import { SearchIcon } from '../../../Lib/Icons';
import { Language } from '../../../../models/language';
import type { Data } from '../../../../models/products';
import { CloseButton, Spinner } from "../../../Lib";

interface SearchProps {
	data: Data | undefined
	value: string
	placeholder: string
	isOpen: boolean
	handleClick: () => void
	handleClickAllProduct: () => void
	onChange: (value: ChangeEvent<HTMLInputElement>) => void
}

export const SearchComponent: FC<SearchProps> = ({ data, placeholder, isOpen, value, handleClick, handleClickAllProduct, onChange }) => {
	const { lang } = useAppSelector(state => state.langReducer);

	return <div className={twMerge('relative w-full mx-auto mt-4 lg:mt-0 lg:max-w-[600px]', styles.search)}>
		<div className='flex rounded bg-white border border-gray-300 w-full'>
			<input
				type="text"
				value={ value }
				onChange={(e) => onChange(e)}
				className="w-full flex bg-transparent pl-4 text-gray-500 font-medium outline-0"
				placeholder={placeholder}
			/>
			<button type="submit" className="btn primary w-16 h-12 -my-px -mr-px">
				<SearchIcon className='fill-white'/>
			</button>
		</div>
		<div className={twMerge('absolute top-12 right-0 z-20 py-6 px-8 md:px-10 bg-zinc-700 text-white rounded-lg w-full lg:max-w-[460px]', !isOpen && 'hidden')}>
			<CloseButton handleClick={ handleClick } />
			<ul className='mb-8'>
				<Spinner height='h-20' show={!data}>
					{ data?.products?.map(item => {
						return <li key={ item.group } className='my-3'>
							<Link className='hover:underline' onClick={ handleClick } to={item.page_url}>
								{ item.full_name }
							</Link>
						</li>
					}) }
				</Spinner>
			</ul>
			<Link className='btn primary mx-auto' onClick={ handleClickAllProduct } to={`/search`}>
				{ lang === Language.UA ? 'Усі результати пошуку ' : 'Все результаты поиска ' }
				({ data?.total_count })
			</Link>
		</div>
	</div>
};
