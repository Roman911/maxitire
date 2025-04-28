import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { Link } from '../../lib';
import { useAppDispatch } from '../../hooks';
import { resetFilter } from '../../store/reducers/filterSlice';

interface BreadcrumbsItem {
	id: number
	title: string
	url: string | false | undefined
}

interface BreadcrumbsProps {
	path: BreadcrumbsItem[]
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ path }) => {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(resetFilter());
	}

	return <nav className='breadcrumbs'>
		<ol className='flex overflow-auto max-w-full whitespace-nowrap'>
			<li className='text-sm'>
				<Link className='text-gray-700' onClick={ () => handleClick() } to="/">
					<i className='icon iconfont-home'></i>
				</Link>
			</li>
			{ path.map((item, index) => {
				if(!item.url) return null;

				return <li
					key={ item.id }
					className={
						twMerge('text-sm before:content-["/"] pl-1.5 before:pr-1.5',
							index === path.length - 1 ? 'text-[#161111] font-bold' : 'hover:text-blue-500 text-[#575C66]'
						) }
				>
					<Link
						className={ twMerge(index !== path.length - 1 ? 'underline' : 'pointer-events-none') }
						to={ item.url }
						onClick={ () => handleClick() }
					>
						{ item.title }
					</Link>
				</li>
			}) }
		</ol>
	</nav>
};
