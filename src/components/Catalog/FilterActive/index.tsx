import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAppTranslation } from '../../../hooks';
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
	const searchParamsLength = searchParams && Object.keys(searchParams).length;

	const renderItem = (name: keyof IFilter, label: string | number | null) => {
		return (
			<div
				key={ name }
				className='py-1 px-1.5 bg-gray-100 font-medium rounded-full flex items-center gap-1 transition hover:bg-gray-300'
			>
				<button className='text-black' onClick={ () => clearParam(name) }>
					<i className="icon iconfont-close"></i>
				</button>
				<span>{ label }</span>
			</div>
		);
	};

	return <div>
		<div className='flex justify-between'>
			<div className='text-lg font-bold'>
				{ t('filters', true) }
			</div>
			{ searchParamsLength !== 0 &&
				<button
					onClick={ () => clearAllParams() }
					className='text font-medium group bg-gradient-to-b from-amber-400 to-orange-600 bg-clip-text text-transparent'
				>
					{ t('reset everything', true) }
				</button> }
		</div>
		<div className={
			twMerge('mt-2 mb-3 flex-wrap justify-end gap-x-2 gap-y-3 lg:gap-2 text-end lg:bg-transparent p-4 lg:p-0',
				className, searchParamsLength !== 0 && 'bg-blue-50')
		}>
			{ searchParams && Object.keys(searchParams || {})
				.filter(item => searchParams && searchParams[item as keyof IFilter]).map(item => {
					const label = searchParams[item as keyof IFilter];

					// Example: Additional check if label is null or undefined
					if(label == null) return null; // Skip rendering if label is null

					if(item === 'brand') {
						if(section === Section.Battery && dataAkum?.brand_akum) {
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-expect-error
							const brand = dataAkum.brand_akum.find(i => i.value === +searchParams[item as keyof IFilter]);
							return renderItem(item as keyof IFilter, t(brand ? brand.label : '', true) || null);
						} else if(section === Section.Disks && data?.brand_disc) {
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-expect-error
							const brand = data.brand_disc.find(i => i.value === +searchParams[item as keyof IFilter]);
							return renderItem(item as keyof IFilter, t(brand ? brand.label : '', true) || null);
						} else if(data?.brand) {
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
						if(searchParams[item] === '1') {
							return renderItem(item as keyof IFilter, t('steel', true) || null);
						} else if(searchParams[item] === '2') {
							return renderItem(item as keyof IFilter, t('forged', true) || null);
						} else if(searchParams[item] === '3') {
							return renderItem(item as keyof IFilter, t('cast', true) || null);
						} else {
							return null; // Return null if the type value is not valid
						}
					}

					// Double-check that label is not null or undefined before rendering
					if(label == null) return null;

					return renderItem(item as keyof IFilter, searchParams[item as keyof IFilter] || null);
				}) }
		</div>
	</div>
};
