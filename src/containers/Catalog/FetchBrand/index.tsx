import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { baseDataAPI } from '../../../services/baseDataService';
import { Language } from '../../../models/language';

interface FetchBrandProps {
	brand: string
	lang: Language
}

export const FetchBrand: FC<FetchBrandProps> = ({ brand, lang }) => {
	const { data } = baseDataAPI.useFetchBrandQuery(brand);
	const titleBrand = data?.descr?.[lang].meta_title;
	const descriptionBrand = data?.descr?.[lang].meta_description;

	return <Helmet>
		<title>{ titleBrand }</title>
		<meta name='description' content={ descriptionBrand }/>
	</Helmet>
};
