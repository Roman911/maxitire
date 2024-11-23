import { FC } from 'react';
import classNames from 'classnames';

import { useAppSelector, useAppSubmit, useAppTranslation } from '../../../hooks';
import { Link } from '../../../lib';

import { FilterActive } from '../../../containers/Catalog/FilterActive';
import { Select } from './Select';
import { SelectFromTo } from './SelectFromTo';
import { MySelect } from './SelectToByCar';
import { CloseIcon } from '../../Lib/Icons';
import { Badge } from '../../Lib/';

import { Section, Subsection } from '../../../models/filter';
import { SubmitFloat } from './SubmitFloat';
import { Language } from "../../../models/language";
import { appointmentCargo, appointmentIndustrial, customTireSeason, others, typeDisc } from './customParamForSelector';
import type { CarModelProps, BaseDataProps, Options, ManufModels } from '../../../models/baseData';
import type { AkumProps } from '../../../models/akumData';

interface FilterAltProps {
	isProduct?: boolean
	element: HTMLElement | null
	data: BaseDataProps | undefined
	fildterData: BaseDataProps | undefined
	dataAkum: AkumProps | undefined
	isOpenFilter: boolean
	closeFilter: () => void
	handleClick: (value: Subsection) => void
	onClick: (value: Section) => void
	onChange: (name: string, value: number | string | undefined | null, element: HTMLElement) => void
	onChangeByCar: (name: string, value: number | string | undefined) => void
	setElement: (value: null) => void
	manufModels: ManufModels[] | undefined
	model?: CarModelProps[]
	modelYear?: number[]
	modelKit?: CarModelProps[]
}

export const FilterAltComponent: FC<FilterAltProps> = (
	{
		isProduct,
		element,
		data,
		fildterData,
		dataAkum,
		isOpenFilter,
		closeFilter,
		handleClick,
		onClick,
		onChange,
		onChangeByCar,
		setElement,
		manufModels,
		model,
		modelYear,
		modelKit
	}) => {
	const { section, subsection, filter } = useAppSelector(state => state.filterReducer);
	const { filter: filterCar } = useAppSelector(state => state.filterCarReducer);
	const { lang } = useAppSelector(state => state.langReducer);
	const { handleSubmit } = useAppSubmit();
	const t = useAppTranslation();
	const country = lang === Language.UA ? data?.country : data?.country_ru;
	const cargoTypes = ['3', '4', '5', '6'];
	const industrialTypes = ['9', '10', '11'];

	const appointmentCargoShow = filter.vehicle_type && cargoTypes.includes(filter.vehicle_type);
	const appointmentIndustrialShow = filter.vehicle_type && industrialTypes.includes(filter.vehicle_type);

	const onSubmit = () => {
		handleSubmit();
		closeFilter();
	}

	const renderSelect = (
		name: string,
		label: string,
		variant: 'white' | 'gray',
		options: Array<Options> = [],
		focusValue: string | false,
		value?: null | number | string,
		search?: boolean,
		valueStudded?: null | number | string,
		filterOther?: {
			only_c: string | null | undefined
			only_xl: string | null | undefined
			only_owl: string | null | undefined
			only_run_flat: string | null | undefined
			only_off_road: string | null | undefined
		}
	) => (
		<div className='relative'>
			<Select
				name={ name }
				label={ label }
				focusValue={ focusValue }
				options={ options }
				variant={ variant }
				onChange={ onChange }
				filterValue={ value }
				search={ search }
				valueStudded={ valueStudded }
				filterOther={ filterOther }
			/>
			{ value && <Badge value={ 1 } className='-left-2' />}
		</div>
	);

	const renderTab = (value: Section) => {
		const url = `/catalog/${value}`;

		return (
			<Link
				to={url}
				onClick={() => onClick(value)}
				className={classNames(
					'text-sm font-bold uppercase py-3.5 rounded-t-sm border border-slate-200 border-b-0 text-center',
					{ 'bg-white': section === value, 'bg-zinc-200 text-gray-500': section !== value }
				)}
			>
				{ t(value, true) }
			</Link>
		);
	};

	return <div className={
		classNames('fixed lg:static top-0 left-0 right-0 bottom-0 bg-[#070B14]/60 lg:bg-transparent z-20 lg:block',
			{'hidden': !isOpenFilter })
	}>
		<button onClick={ () => closeFilter() } className='absolute top-5 right-5 lg:hidden'>
			<CloseIcon className='fill-[#B9B9BA] w-7 h-7' />
		</button>
		<div className='filter h-screen lg:h-auto w-[calc(100%-70px)] lg:w-64 mr-6 lg:pt-0 bg-white lg:bg-transparent'>
			{section !== Section.Battery && !isProduct && <div className='relative z-10 filter-tabs grid grid-cols-2 gap-2.5 -mb-[1px]'>
				{renderTab(Section.Tires)}
				{renderTab(Section.Disks)}
			</div>}
			<div
				className='relative h-[calc(100%-50px)] pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 overflow-y-auto md:overflow-y-visible'>
				<SubmitFloat element={element} btnTitle={t('to apply', true)} setElement={setElement} offset={section === Section.Battery ? 274 : isProduct ? 238 : 322} />
				<FilterActive className='flex lg:hidden'/>
				{section !== Section.Battery && <div className='flex lg:justify-between gap-x-5'>
					<button
						onClick={() => handleClick(Subsection.ByParams)}
						className={classNames('font-bold uppercase lg:normal-case', {
							'text-blue-500': subsection === 'byParams',
							'text-gray-500': subsection !== 'byParams'
						})}
					>
						{t('by parameters', true)}
					</button>
					<button
						onClick={() => handleClick(Subsection.ByCars)}
						className={classNames('font-bold uppercase lg:normal-case', {
							'text-blue-500': subsection === 'byCars',
							'text-gray-500': subsection !== 'byCars'
						})}
					>
						{t('by car', true)}
					</button>
				</div>}
				{subsection === 'byParams' && section !== Section.Battery && <>
					{section === Section.Tires && <>
						{renderSelect(
							'width',
							t('width', true),
							'gray',
							fildterData?.tyre_width?.map(item => ({value: item.value, label: item.value, p: item.p})),
							'175',
							filter?.width,
							true,
						)}
						{section === Section.Tires && renderSelect(
							'height',
							t('height', true),
							'gray',
							fildterData?.tyre_height?.map(item => ({value: item.value, label: item.value, p: item.p})),
							'45',
							filter?.height,
							true,
						)}
						{renderSelect(
							'radius',
							t('diameter', true),
							'gray',
							fildterData?.tyre_diameter?.map(item => ({value: item.value, label: `R${item.value}`, p: item.p})),
							'R13',
							filter?.radius,
							true,
						)}
					</>}
					{section === Section.Disks && <>
						{renderSelect(
							'width',
							t('width', true),
							'gray',
							fildterData?.disc_width?.map(item => ({value: item.value, label: item.value, p: item.p})),
							false,
							filter?.width,
							true,
						)}
						{renderSelect(
							'radius',
							t('diameter', true),
							'gray',
							data?.disc_diameter?.map(item => ({value: item.value, label: `R${item.value}`, p: item.p})),
							'R13',
							filter?.radius,
							true,
						)}
					</>}
				</>}
				{subsection === 'byCars' && <>
					<div className='mt-2'>
						{<MySelect
							name='brand'
							label={t('car brand', true)}
							options={data?.auto?.map(item => ({value: item.value, label: item.label}))}
							onChange={onChangeByCar}
							defaultValue={filterCar?.brand ? data?.auto?.find(i => i.value === filterCar.brand) : undefined}
						/>}
					</div>
					<div className='mt-2'>
						<MySelect
							name='model'
							label={t('model', true)}
							options={model?.map(item => ({value: item.value, label: item.label}))}
							isDisabled={model?.length === 0}
							onChange={onChangeByCar}
							defaultValue={filterCar?.model ? model?.find(i => i.value === filterCar.model) : undefined}
						/>
					</div>
					<div className='mt-2'>
						<MySelect
							name='year'
							label={t('graduation year', true)}
							options={modelYear?.map(item => ({value: item, label: item}))}
							isDisabled={modelYear?.length === 0}
							onChange={onChangeByCar}
							defaultValue={filterCar?.year ? {value: filterCar?.year, label: filterCar?.year} : undefined}
						/>
					</div>
					<div className='mt-2'>
						<MySelect
							name='modification'
							label={t('modification', true)}
							options={modelKit?.map(item => ({value: item.value, label: item.label}))}
							isDisabled={modelKit?.length === 0}
							onChange={onChangeByCar}
							defaultValue={filterCar?.modification ? modelKit?.find(i => i.value === filterCar.modification) : undefined}
						/>
					</div>
				</>}
				{section === Section.Battery && <>
					{renderSelect(
						'jemnist',
						t('capacity', true),
						'gray',
						dataAkum?.jemnist.map(item => ({value: item.value, label: item.value, p: item.p})),
						false,
						filter?.jemnist,
						true,
					)}
					{renderSelect(
						'puskovii_strum',
						t('starting current', true),
						'gray',
						dataAkum?.['puskovii-strum'].map(item => ({value: item.value, label: item.value, p: item.p})),
						false,
						filter?.puskovii_strum,
						true,
					)}
					{renderSelect(
						'tip_elektrolitu',
						t('type of electrolyte', true),
						'gray',
						dataAkum?.['tip-elektrolitu'].map(item => ({value: item.value, label: item.value, p: item.p})),
						false,
						filter?.tip_elektrolitu,
					)}
					{renderSelect(
						'tip_korpusu',
						t('body type', true),
						'gray',
						dataAkum?.['tip-korpusu'].map(item => ({value: item.value, label: item.value, p: item.p})),
						false,
						filter?.tip_korpusu,
					)}
					{renderSelect(
						'brand',
						t('all brands', true),
						'gray',
						dataAkum?.brand_akum?.map(item => ({value: item.value, label: item.label})),
						false,
						filter?.brand && Number(filter.brand),
						true,
					)}
				</>}
				{section === Section.Tires && <>
					{!appointmentCargoShow && !appointmentIndustrialShow && renderSelect(
						'sezon',
						'Сезон',
						'gray',
						customTireSeason.map(item => ({value: item.value, label: lang === Language.UA ? item.name_ua : item.name})),
						false,
						filter?.sezon,
						false,
						filter?.only_studded
					)}
					{appointmentCargoShow && renderSelect(
						'vehicle_type',
						t('appointment', true),
						'gray',
						appointmentCargo.map(item => ({value: item.value, label: lang === Language.UA ? item.name_ua : item.name})),
						false,
						filter?.vehicle_type,
					)}
					{appointmentIndustrialShow && renderSelect(
						'vehicle_type',
						t('appointment', true),
						'gray',
						appointmentIndustrial.map(item => ({
							value: item.value,
							label: lang === Language.UA ? item.name_ua : item.name
						})),
						false,
						filter?.vehicle_type,
					)}
					{renderSelect(
						'brand',
						t('all brands', true),
						'gray',
						data?.brand?.map(item => ({value: item.value, label: item.label})),
						false,
						filter?.brand && Number(filter.brand),
						true,
					)}
				</>}
				{section === Section.Disks && <>
					{renderSelect(
						'krepeg',
						t('fasteners', true),
						'gray',
						data?.krip?.map(item => ({value: item.value, label: item.value, p: item.p})),
						false,
						filter?.krepeg,
						true,
					)}
					<SelectFromTo name='et' nameMin='etMin' nameMax='etMax' minus={true} from={-140} to={500}
												title={`ET(${t('departure', true)})`} btnTitle={t('to apply')} closeFilter={ closeFilter } />
					<SelectFromTo name='dia' nameMin='diaMin' nameMax='diaMax' from={46} to={500} title='DIA'
												btnTitle={t('to apply')} closeFilter={ closeFilter } />
					{renderSelect(
						'typedisk',
						t('type', true),
						'gray',
						typeDisc.map(item => ({value: item.value, label: lang === Language.UA ? item.name_ua : item.name})),
						false,
						filter?.typedisk,
					)}
					{renderSelect(
						'colir',
						t('color', true),
						'gray',
						data?.colir_abbr?.map(item => ({value: item.value, label: item.value, p: item.p})),
						false,
						filter?.colir,
						true,
					)}
					{renderSelect(
						'brand',
						t('all brands', true),
						'gray',
						data?.brand_disc?.map(item => ({value: item.value, label: item.label})),
						false,
						filter?.brand && Number(filter.brand),
						true,
					)}
				</>}
				{manufModels && manufModels.length > 0 && renderSelect(
					'model_id',
					t('model', true),
					'gray',
					manufModels?.map(item => ({value: item.value, label: item.label})),
					false,
					filter?.model_id && Number(filter.model_id),
					true,
				)}
				{section === Section.Tires && renderSelect(
					'country',
					t('country', true),
					'gray',
					country?.map(item => ({value: item.value, label: item.label})),
					false,
					filter?.country,
					true,
				)}
				{section === Section.Tires && renderSelect(
					'year',
					t('year', true),
					'gray',
					data?.tyre_year?.map(item => ({value: item.value, label: item.label})),
					false,
					filter?.year && (filter.year),
				)}
				<SelectFromTo name='price' nameMin='minPrice' nameMax='maxPrice' from={200} to={10000}
											title={`${t('price range', true)} (грн)`} btnTitle={t('to apply')} closeFilter={ closeFilter } />
				{section === Section.Battery && <>
					<SelectFromTo name='sirina' nameMin='minShirina' nameMax='maxShirina' from={0} to={600} title={`Ширина (см)`}
												btnTitle={t('to apply')} closeFilter={ closeFilter } />
					<SelectFromTo name='visota' nameMin='minVisota' nameMax='maxVisota' from={0} to={190} title={`Висота (см)`}
												btnTitle={t('to apply')} closeFilter={ closeFilter } />
					<SelectFromTo name='dovzina' nameMin='minDovzina' nameMax='maxDovzina' from={0} to={600}
												title={`Довжина (см)`} btnTitle={t('to apply')} closeFilter={ closeFilter } />
					{renderSelect(
						'napruga',
						t('high-voltage', true),
						'gray',
						dataAkum?.napruga.map(item => ({value: item.value, label: item.value, p: item.p})),
						false,
						filter?.napruga,
					)}
					{renderSelect(
						'poliarnist',
						t('polarity', true),
						'gray',
						dataAkum?.poliarnist.map(item => ({value: item.value, label: item.value, p: item.p})),
						false,
						filter?.poliarnist,
					)}
				</>}
				{section === Section.Tires && <>
					{renderSelect(
						'li',
						t('load index', true),
						'gray',
						data?.load.map(item => ({value: item.value, label: item.value})),
						false,
						filter?.li,
						true,
					)}
					{renderSelect(
						'si',
						t('speed index', true),
						'gray',
						data?.speed.map(item => ({value: item.value, label: item.value})),
						false,
						filter?.si,
						true,
					)}
					{renderSelect(
						'omolog',
						t('homologation', true),
						'gray',
						data?.omolog.map(item => ({value: item.value, label: item.value})),
						false,
						filter?.omolog,
						true,
					)}
					{renderSelect(
						'other',
						t('other', true),
						'gray',
						others.map(item => ({value: item.value, label: lang === Language.UA ? item.name_ua : item.name})),
						false,
						null,
						false,
						null,
						{
							only_c: filter?.only_c ?? null,
							only_xl: filter?.only_xl ?? null,
							only_owl: filter?.only_owl ?? null,
							only_run_flat: filter?.only_run_flat ?? null,
							only_off_road: filter?.only_off_road ?? null,
						}
					)}
				</>}
			</div>
			<div className='fixed bottom-2 z-10 w-[calc(100%-70px)] px-4 lg:hidden'>
				<button onClick={() => onSubmit()} className='btn primary w-full text-sm uppercase'>
					{ t('apply filters') }
				</button>
			</div>
		</div>
	</div>
};
