import { FC } from 'react';

import { Link } from '../../../../../lib';
import { useAppTranslation } from '../../../../../hooks';
import { TypeCarLinks } from '../../../../Lib/TypeCarLinks';
import { LinkComponent } from '../LinkComponent';
import { seasonLinks, brandsLinks, diameterLinks } from './links';

interface CarTireFilterProps {
	closeFilter?: () => void
}

export const CarTireFilter: FC<CarTireFilterProps> = ({ closeFilter }) => {
	const t = useAppTranslation();

	return <>
		<div>
			<h6 className='text-gray-500 font-bold uppercase mb-6'>
				{ t('by season', true) }
			</h6>
			{seasonLinks.map(item => {
				return <LinkComponent
					key={ item.label }
					to={ item.to }
					img={ item.img }
					label={ t(item.label, true) }
					mt={ item.mt }
					onClick={ closeFilter }
				/>
			})}
		</div>
		<div>
			<h6 className='text-gray-500 font-bold uppercase mb-6'>
				{ t('by car type') }
			</h6>
			<TypeCarLinks onClick={ closeFilter } section='header' />
		</div>
		<div className='mt-6 lg:mt-0'>
			<h6 className='text-gray-500 font-bold uppercase mb-6'>
				{t('by brands')}
			</h6>
			<div className='mt-6 mb-6 grid grid-cols-2 gap-y-4 gap-x-2'>
				{brandsLinks.map(item => {
					return <LinkComponent
						key={ item.label }
						to={ item.to }
						label={ t(item.label, true) }
						onClick={ closeFilter }
					/>
				})}
			</div>
			<Link to='/catalog/tires' onClick={ closeFilter } className='text-blue-500 font-bold uppercase hover:underline'>
				{t('all brands', true)}
			</Link>
		</div>
		<div className='mt-6 lg:mt-0'>
			<h6 className='text-gray-500 font-bold uppercase'>
				{t('by diameter')}
			</h6>
			<div className='mt-6 mb-6 grid grid-cols-4 gap-1.5'>
				{diameterLinks.map(item => {
					return <LinkComponent
						key={ item.label }
						to={ item.to }
						border={ item.border }
						label={ t(item.label, true) }
						onClick={ closeFilter }
					/>
				})}
			</div>
		</div>
	</>
};
