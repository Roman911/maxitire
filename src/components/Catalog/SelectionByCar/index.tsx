import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';
import { baseDataAPI } from '../../../services/baseDataService';
import { Section, Subsection } from '../../../models/filter';
import { Link } from '../../../lib';
import { Language } from '../../../models/language';

export const SelectionByCar = () => {
	const navigate = useNavigate();
	const { section, subsection } = useAppSelector(state => state.filterReducer);
	const { lang } = useAppSelector(state => state.langReducer);
	const { filter } = useAppSelector(state => state.filterCarReducer);
	const { data } = baseDataAPI.useFetchKitTyreSizeQuery(`${filter.modification}`);
	const { data: diskSize } = baseDataAPI.useFetchKitDiskSizeQuery(`${filter.modification}`);

	useEffect(() => {
		if(section === Section.Tires && data?.length) {
			const tires = data?.filter(i => i.type === 1);
			navigate(`${lang === Language.UA ? '' : '/ru'}/catalog/tires/w-${tires[0].width}/h-${tires[0].height}/d-${tires[0].diameter}`);
		}
		if(section === Section.Disks && diskSize?.length) {
			const disks = diskSize?.filter(i => i.type === 1);
			navigate(`${lang === Language.UA ? '' : '/ru'}/catalog/disks/w-${disks[0].width}/d-${disks[0].diameter}/kr-${disks[0].kits.bolt_count}x${disks[0].kits.pcd}/et-${disks[0].et}/dia-${disks[0].kits.dia}`);
		}
	}, [data, diskSize, lang, navigate, section]);

	if(subsection === Subsection.ByParams || data?.length === 0) return null;

	return <div className='mb-5 border-y py-4'>
		<div className='text-gray-500'>Ваш авто:</div>
		<div className='font-bold mt-2'>
			{ `${ data?.[0].kits.car2_model.car2_brand.name } ${ data?.[0].kits.car2_model.name } ${ data?.[0].kits.name } (${ data?.[0].kits.year })` }
		</div>
		<h6 className='text-gray-500 mt-4'>Заводські</h6>
		<div className='flex gap-2 text-sm font-bold mt-2'>
			{section === Section.Tires ? data?.filter(i => i.type === 1).map(item => {
				return <Link className='text-blue-500' key={ item.value } to={ `/catalog/${section}/w-${ item.width }/h-${ item.height }/d-${ item.diameter }` } >
					{ `${ item.width }/${ item.height } R${ item.diameter }` }
				</Link>
			}) : diskSize?.filter(i => i.type === 1).map(item => {
				return <Link className='text-blue-500' key={ item.value } to={ `/catalog/${section}/w-${ item.width }/d-${ item.diameter }/kr-${ item.kits.bolt_count }x${ item.kits.pcd }/et-${ item.et }/dia-${ item.kits.dia }` } >
					{ `${ item.width }x${ item.diameter } ${ item.kits.bolt_count }x${ item.kits.pcd } ET${ item.et } DIA${ item.kits.dia }` }
				</Link>})}
		</div>
		<h6 className='text-gray-500 mt-4'>Альтернатива</h6>
		<div className='flex flex-col gap-2 text-sm font-bold mt-2'>
			{section === Section.Tires ? data?.filter(i => i.type === 2).map(item => {
				return <Link className='text-blue-500' key={ item.value } to={ `/catalog/${section}/w-${ item.width }/h-${ item.height }/d-${ item.diameter }` } >
					{ `${ item.width }/${ item.height } R${ item.diameter }` }
				</Link>
			}) : diskSize?.filter(i => i.type === 2).map(item => {
				return <Link className='text-blue-500' key={ item.value } to={ `/catalog/${section}/w-${ item.width }/d-${ item.diameter }/kr-${ item.kits.bolt_count }x${ item.kits.pcd }/et-${ item.et }/dia-${ item.kits.dia }` } >
					{ `${ item.width }x${ item.diameter } ${ item.kits.bolt_count }x${ item.kits.pcd } ET${ item.et } DIA${ item.kits.dia }` }
				</Link>})}
		</div>
	</div>
};
