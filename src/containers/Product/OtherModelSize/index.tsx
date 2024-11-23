import {FC, useEffect, useState} from 'react';

import { baseDataAPI } from '../../../services/baseDataService';
import { useAppSelector } from '../../../hooks';
import { Spinner } from '../../../components/Lib';
import { Link } from '../../../lib';
import { Section } from '../../../models/filter';
import { Language } from '../../../models/language';

const cargoTypes = ['3', '4', '5', '6', '9', '10', '11'];

interface ItemProps {
	b: number | undefined
	m: number | undefined
	d: string | false
	modelName: string
	width: string | false
	height: string | false
}

interface OtherModelSizeProps {
	section: string
	brand: number | undefined
	model: number | undefined
	diameter: string | undefined
	vehicle_type: string | undefined | false
}

export const OtherModelSize: FC<OtherModelSizeProps> = ({ section, brand, model, diameter, vehicle_type }) => {
	const [id, setId] = useState('');
	const { lang } = useAppSelector(state => state.langReducer);
	const typeproduct = (vehicle_type && cargoTypes.includes(vehicle_type)) ? 'typeproduct=2' : '';
	const { data, isLoading } = baseDataAPI.useFetchProductsQuery({id, length: 40});
	const products = data?.result ? data?.data.products : undefined;

	const dataFilter = products?.filter(item => item.diameter === diameter);
	const dataFilter2 = products?.filter(item => item.diameter !== diameter);

	useEffect(() => {
		setId(section === Section.Tires ?
			`?brand=${brand}&model_id=${model}&vehicle_type=${vehicle_type}${typeproduct}` :
			`?typeproduct=3&brand=${brand}&model_id=${model}`);
	}, [brand, model, section, typeproduct, vehicle_type]);

	const ItemRender = ({ b, m, modelName, width, height, d }: ItemProps) => {
		return <Link
			key={ b }
			className='border border-blue-500 rounded-full h-10 px-4 text-sm font-semibold flex items-center justify-center text-center hover:bg-[#E9F4FF]'
			to={ `/catalog/${section}/b-${b}/m-${m}/w-${width}/d-${d}${height ? `/h-${height}` : ''}` }
		>
			{ `${modelName} ${width}${height ? `/${height}` : ''} R${d}` }
		</Link>
	}

	if(!data?.result) return null;

	return <div className='mt-8 py-10 border-t border-[#DEE2EB]'>
		<h4 className='text-lg font-bold'>{ lang === Language.UA ? 'Інші розміри цієї моделі' : 'Другие размеры данной модели' }</h4>
		<Spinner height='h-40' show={ isLoading }>
			<div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-5'>
				{ [...dataFilter || [], ...dataFilter2 || []].slice(0, 12).map(item => {
					return <ItemRender
						key={ item.group }
						b={ item.brand }
						m={ item.model_id }
						d={ item.diameter }
						modelName={ item.model.name }
						width={ item.width }
						height={ item.height }
					/>
				}) }
			</div>
		</Spinner>
	</div>
};
