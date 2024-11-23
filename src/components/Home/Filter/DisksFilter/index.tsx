import { FC } from 'react';

import { useAppTranslation } from '../../../../hooks';
import { MySelect } from "../Select";
import type { FilterProps } from '../../../../models/filterHomePage';
import classNames from "classnames";

interface DisksFilterProps extends FilterProps {
	additionalFilter?: 'tires' | 'disks'
}

export const DisksFilter: FC<DisksFilterProps> = ({ filters, onChange, onSubmit, additionalFilter }) => {
	const t = useAppTranslation();

	return <>
		<div className={ classNames('grid gap-2.5 md:mt-7', { 'grid-cols-1 md:grid-cols-6': additionalFilter, 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6': !additionalFilter }) }>
			{filters.map(item => {
				return <div key={item.name} className={classNames({'md:col-span-2': additionalFilter})}>
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
				className={classNames('btn md:h-[70px] mt-4 secondary w-full uppercase', { 'md:col-span-6': additionalFilter, 'md:mt-0': !additionalFilter })}
			>
				{ t('choose') }
			</button>
		</div>
	</>
};
