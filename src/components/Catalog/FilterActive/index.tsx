import { FC } from 'react';
import classNames from 'classnames';

import { useAppTranslation } from '../../../hooks';
import { CloseIcon } from '../../Lib/Icons';
import type { BaseDataProps, ManufModels } from '../../../models/baseData';
import type { AkumProps } from '../../../models/akumData';
import { Section } from '../../../models/filter';
import { IFilter } from '../../../containers/Catalog/seoType';
import { SeasonTransform, VehicleTypeTransform } from '../../../lib';

interface FilterActiveProps {
	data: BaseDataProps | undefined
	dataAkum: AkumProps | undefined
	className: string
	searchParams: IFilter | undefined
	clearParam: (name: keyof IFilter) => void
	clearAllParams: () => void
	manufModels: ManufModels[] | undefined
	section: Section
}

export const FilterActiveComponent: FC<FilterActiveProps> = (
	{
		data,
		dataAkum,
		className,
		searchParams,
		clearParam,
		clearAllParams,
		manufModels,
		section
	}) => {
	const t = useAppTranslation();

	const renderItem = (name: keyof IFilter, label: string | number | null) => {
		return (
			<div key={name} className='p-1 bg-gray-500 text-white text-sm font-medium rounded-full flex items-center gap-1 hover:bg-gray-600'>
				<span className="ml-1.5">{label}</span>
				<button onClick={() => clearParam(name)}>
					<CloseIcon className="fill-[#A8AFB6]" />
				</button>
			</div>
		);
	};

	return <div
		className={
		classNames('mb-3 flex-wrap justify-end gap-x-2 gap-y-3 lg:gap-4 text-end lg:bg-transparent p-4 lg:p-0', className, { 'bg-blue-50':  searchParams && Object.keys(searchParams).length !== 0})}
	>
		{searchParams && Object.keys(searchParams || {}).filter(item => searchParams && searchParams[item as keyof IFilter]).map(item => {
			const label = searchParams[item as keyof IFilter];

			// Example: Additional check if label is null or undefined
			if(label == null) return null; // Skip rendering if label is null

			if(item === 'brand') {
				if(section === Section.Battery && dataAkum?.brand_akum) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					const brand = dataAkum.brand_akum.find(i => i.value === +searchParams[item as keyof IFilter]);
					return renderItem(item as keyof IFilter, t(brand ? brand.label : '', true) || null);
				}

				else if(section === Section.Disks && data?.brand_disc) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					const brand = data.brand_disc.find(i => i.value === +searchParams[item as keyof IFilter]);
					return renderItem(item as keyof IFilter, t(brand ? brand.label : '', true) || null);
				}

				else if(data?.brand) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					const brand = data.brand.find(i => i.value === +searchParams[item as keyof IFilter]);
					return renderItem(item as keyof IFilter, t(brand ? brand.label : '', true) || null);
				}
			}

			if(item === 'model_id') {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				const modelId = manufModels?.find(i => i.value === +searchParams[item as keyof IFilter]);
				return renderItem(item as keyof IFilter, t(modelId ? modelId.label : '', true) || null);
			}

			if(item === 'sezon') {
				if(searchParams[item]) {
					return renderItem(
						item as keyof IFilter,
						t(SeasonTransform(searchParams[item])?.name || '', true) ?? ''
					);
				}
			}

			if(item === 'vehicle_type') {
				if(searchParams[item]) {
					return renderItem(
						item as keyof IFilter,
						t(VehicleTypeTransform(searchParams[item])?.name || '', true) ?? ''
					);
				}
			}

			if(item === 'only_studded') {
				return renderItem(item as keyof IFilter, 'Шип');
			}

			if(item === 'only_off_road') {
				return renderItem(item as keyof IFilter, 'Off-Road 4x4');
			}

			if(item === 'typedisk') {
				if (searchParams[item] === '1') {
					return renderItem(item as keyof IFilter, t('steel', true) || null);
				} else if (searchParams[item] === '2') {
					return renderItem(item as keyof IFilter, t('forged', true) || null);
				} else if (searchParams[item] === '3') {
					return renderItem(item as keyof IFilter, t('cast', true) || null);
				} else {
					return null; // Return null if the type value is not valid
				}
			}

			// Double-check that label is not null or undefined before rendering
			if(label == null) return null;

			return renderItem(item as keyof IFilter, searchParams[item as keyof IFilter] || null);
		})}
		{searchParams && Object.keys(searchParams).length !== 0 && <button onClick={() => clearAllParams()} className='flex items-center gap-2 text-sm font-medium group text-gray-500'>
			{t('reset everything', true)}
			<CloseIcon className='fill-[#B9B9BA] hidden lg:block'/>
		</button>}
	</div>
};
