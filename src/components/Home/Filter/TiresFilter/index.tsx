import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAppTranslation } from '../../../../hooks';
import { MySelect } from '../Select';
import type { FilterProps } from '../../../../models/filterHomePage';

interface TiresFilterProps extends FilterProps {
	additionalFilter?: 'tires' | 'disks'
}

export const TiresFilter: FC<TiresFilterProps> = ({ filters, onChange, onSubmit, additionalFilter }) => {
	const t = useAppTranslation();

	return <>
		<div className={ twMerge('grid gap-7 md:mt-7', additionalFilter ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4') }>
			{filters.map((item, index) => {
				const style = twMerge(index < 3 ? 'md:col-span-2' : 'md:col-span-3');
				return <div key={item.name} className={ additionalFilter ? style : '' }>
					<MySelect
						name={item.name}
						label={item.label}
						options={item.options}
						onChange={onChange}
						focusValue={item.focusValue}
					/>
				</div>
			})}
			<button
				onClick={() => onSubmit()}
				className={twMerge('btn md:h-12 mt-4 primary w-full uppercase', additionalFilter ? 'md:col-span-6' : 'md:mt-0')}
			>
				{t('choose')}
			</button>
		</div>
	</>
};
