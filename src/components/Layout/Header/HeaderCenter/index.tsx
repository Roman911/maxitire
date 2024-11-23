import { SetStateAction, useState } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

import { useAppSelector, useAppTranslation } from '../../../../hooks';
import { Link } from '../../../../lib';
import { Search } from '../../../../containers/Layout/Header/Search';
import { Badge } from '../../../Lib';

import logo from '../../../../assets/logo.svg';
import { CartIcon, ChevronDownIcon, CloseMenuIcon, HeartIcon, MenuIcon } from '../../../Lib/Icons';
import { CarTireFilter } from "../HeaderBottom/CarTireFilter";
import { CarDiskFilter } from "../HeaderBottom/CarDiskFilter";
import { links } from '../links';

export const HeaderCenter = () => {
	const [filterIsOpen, setFilterOpen] = useState<boolean | string>(false);
	const [openMenu, setOpenMenu] = useState(false);

	const t = useAppTranslation();
	const {bookmarksItems} = useAppSelector(state => state.bookmarksReducer);
	const {cartItems} = useAppSelector(state => state.cartReducer);

	const handleClick = (value: SetStateAction<boolean | string>) => {
		if(filterIsOpen !== value) {
			setFilterOpen(value);
		} else {
			setFilterOpen(false);
		}
	};

	const closeFilter = () => {
		setFilterOpen(false);
		setOpenMenu(false);
	}

	const onClick = () => {
		setOpenMenu(false);
	}

	return <div className={classNames('bg-white relative border-b border-gray-500', styles['header-center'])}>
		<div
			className={classNames('container max-w-6xl mx-auto grid items-center px-4 grid-cols-2 lg:grid-cols-[180px_auto_220px_120px]', styles.container)}>
			<Link to='/' className='logo max-w-40 md:max-w-48 lg:w-auto'>
				<img src={logo} className="logo" alt="logo"/>
			</Link>
			<Search />
			<div className='font-medium'>
				<div>
					м. Житомир
				</div>
				<div>
					пр-т Незалежності, 55а
				</div>
			</div>
			<div className={classNames('flex gap-4 md:gap-7 justify-end', styles.menu)}>
				<Link to='/bookmarks' className='relative'>
					<Badge value={bookmarksItems.length}/>
					<HeartIcon/>
				</Link>
				<Link to='/cart' className='relative'>
					<Badge value={cartItems.length}/>
					<CartIcon/>
				</Link>
				<button onClick={() => setOpenMenu(prev => !prev)} className='lg:hidden'>
					{openMenu ? <CloseMenuIcon className='fill-[#142033]'/> : <MenuIcon className='fill-[#142033]'/>}
				</button>
			</div>
		</div>
		<div
			className={classNames('absolute top-32 bg-white w-full divide-y divide-[#E6E9EB] border-t border-[#E6E9EB] z-50 lg:hidden', {'hidden': !openMenu})}>
			<div className='py-5'>
				<button onClick={() => handleClick('tires')}
								className={classNames('px-5 w-full flex items-center justify-between uppercase font-bold group transition hover:text-blue-500', {'text-blue-500': filterIsOpen === 'tires'})}>
					<span>{t('cartires')}</span>
					<span className={classNames('transition', {'rotate-180': filterIsOpen === 'tires'})}>
						<ChevronDownIcon
							className={classNames('stroke-black transition group-hover:stroke-blue-500', {'stroke-blue-500': filterIsOpen === 'tires'})}/>
					</span>
				</button>
				{filterIsOpen === 'tires' &&
					<div className='mt-5 px-5 py-5 border-t border-[#E6E9EB] bg-[#FAFAFC] grid grid-cols-2'>
						<CarTireFilter closeFilter={ closeFilter } />
					</div>
				}
			</div>
			<div className='py-5'>
				<button onClick={() => handleClick('disks')}
								className={classNames('px-5 w-full flex items-center justify-between uppercase font-bold group transition hover:text-blue-500', {'text-blue-500': filterIsOpen === 'disks'})}>
					<span>Автодиски</span>
					<span className={classNames('transition', {'rotate-180': filterIsOpen === 'disks'})}>
						<ChevronDownIcon
							className={classNames('stroke-black transition group-hover:stroke-blue-500', {'stroke-blue-500': filterIsOpen === 'disks'})}/>
					</span>
				</button>
				{filterIsOpen === 'disks' &&
					<div className='mt-5 px-5 py-5 border-t border-[#E6E9EB] bg-[#FAFAFC] grid grid-cols-2'>
						<CarDiskFilter closeFilter={ closeFilter } />
					</div>
				}
			</div>
			{links.map((item, index) => {
				return <Link key={index} onClick={ () => onClick() } className='py-5 px-5 block uppercase font-bold' to={item.url}>
					{t(item.title)}
				</Link>
			})}
		</div>
	</div>
};
