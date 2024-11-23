import { FC } from 'react';
import classNames from 'classnames';

import { Link } from '../../../../lib';
import { useAppTranslation } from '../../../../hooks';
import { MySelect } from '../Select';
import type { Options } from '../../../../models/baseData';

interface FilterByCarProps {
	disabled: boolean
	filters: {
		label: string
		name: string
		options?: Options[]
		isDisabled?: boolean
	}[]
	onClick: () => void
	additionalFilter?: 'tires' | 'disks'
	onChange: (name: string, value: number | string | undefined) => void
}

export const FilterByCarComponents: FC<FilterByCarProps> = ({ disabled, filters, additionalFilter, onClick, onChange }) => {
	const t = useAppTranslation();

	return <>
		<div className={classNames('grid gap-2.5 md:mt-7', {
			'grid-cols-1 md:grid-cols-6': additionalFilter,
			'grid-cols-1 md:grid-cols-5': !additionalFilter
		})}>
			{filters.map(item => {
				return <div key={item.name} className={classNames({'md:col-span-3': additionalFilter})}>
					<MySelect
						name={item.name}
						label={item.label}
						options={item.options}
						onChange={onChange}
						isDisabled={item.isDisabled}
					/>
				</div>
			})}
			<Link
				to='/catalog/tires'
				onClick={onClick}
				className={classNames('btn md:h-[70px] mt-4 secondary w-full uppercase', { 'md:col-span-6': additionalFilter, 'md:mt-0': !additionalFilter, 'pointer-events-none': disabled })}
			>
				{t('choose')}
			</Link>
		</div>
	</>
};
