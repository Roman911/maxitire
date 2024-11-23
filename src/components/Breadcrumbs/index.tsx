import { FC } from 'react';
import classNames from 'classnames';

import { Link } from '../../lib';
import { useAppDispatch } from '../../hooks';
import { resetFilter } from '../../store/reducers/filterSlice';
import { HomeIcon } from '../Lib/Icons';

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
				<Link onClick={() => handleClick()} to="/"><HomeIcon className='fill-[#575C66]'/></Link>
			</li>
			{path.map((item, index) => {
				if(!item.url) return null;

				return <li
					key={ item.id }
					className={
					classNames('text-sm before:content-["/"] pl-1.5 before:pr-1.5',
						{ 'text-[#161111] font-bold': index === path.length - 1 },
						{ 'hover:text-blue-500 text-[#575C66]': index !== path.length - 1 }
					)}
				>
					<Link
						className={
						classNames(
							{ 'underline': index !== path.length - 1 },
							{ 'pointer-events-none': index === path.length - 1 }
						)}
						to={item.url}
						onClick={() => handleClick()}
					>
						{ item.title }
					</Link>
				</li>
			})}
		</ol>
	</nav>
}
