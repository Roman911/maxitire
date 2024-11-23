import { useRef, useState, type MouseEvent, type SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAppDispatch, useAppTranslation, useClickOutside } from '../../../../hooks';
import { resetFilter } from '../../../../store/reducers/filterSlice';
import { Link } from '../../../../lib';
import { CarDiskFilter } from './CarDiskFilter';
import { CarTireFilter } from './CarTireFilter';
import { ChevronDownIcon } from '../../../Lib/Icons';
import { links } from '../links';

export const HeaderBottom = () => {
	const [ open, setOpen ] = useState( false );
	const filterRef = useRef<HTMLDivElement>(null);
	const [ section, setSection ] = useState( 'tires' );
	const dispatch = useAppDispatch();
	const t = useAppTranslation();

	const closeFilter = () => {
		dispatch(resetFilter());
		setOpen(false);
	}

	useClickOutside({ ref: filterRef, open, onClose: closeFilter });

	const handleClick = (event: MouseEvent<HTMLButtonElement>, value: SetStateAction<string>) => {
		event.stopPropagation();
		setOpen(!(open && section === value));
		if (section !== value) {
			setSection(value);
		}
	};

	return <div className='relative bg-white hidden lg:block'>
		<nav className='container mx-auto max-w-6xl flex justify-center items-center text-black text-lg font-semibold'>
			<button onClick={event => handleClick(event, 'tires')} type="button"
							className={twMerge('inline-flex items-center gap-x-1.5 group transition py-3 px-8', (open && section === 'tires') && 'bg-blue-600')}>
				<span>{ t('cartires', true) }</span>
				<span className={twMerge('transition', (open && section === 'tires') && 'rotate-180')}>
					<ChevronDownIcon className='stroke-black transition' />
				</span>
			</button>
			<button onClick={event => handleClick(event, 'disks')} type="button"
							className={twMerge('inline-flex items-center gap-x-1.5 group transition py-3 px-8', (open && section === 'disks') && 'bg-blue-600')}>
				<span>Автодиски</span>
				<span className={twMerge('transition', (open && section === 'disks') && 'rotate-180')}>
					<ChevronDownIcon className='stroke-black transition' />
				</span>
			</button>
			{links.map((item, index) => {
				return <Link key={ index } onClick={ () => dispatch(resetFilter()) } className='py-3 px-8' to={ item.url }>
					{ t(item.title, true) }
				</Link>
			})}
			<div
				ref={filterRef}
				className={twMerge('absolute left-0 right-0 top-14 z-30 flex w-full', !open && 'hidden')}>
				<div className='w-full overflow-hidden bg-white shadow-lg ring-1 ring-gray-900/5 pt-8 text-black font-normal'>
					<div className='flex-auto max-w-7xl grid grid-cols-4 mx-auto px-4'>
						{section === 'tires' ? <CarTireFilter closeFilter={closeFilter}/> :
							<CarDiskFilter closeFilter={closeFilter}/>}
					</div>
					<Link onClick={closeFilter} className='block w-full bg-[#F0F2F5] py-5 hover:bg-[#E9EBF0] text-center mt-6'
								to={`/catalog/${section}/`}>
						{t('all tires', true)}
					</Link>
				</div>
			</div>
		</nav>
	</div>
};
