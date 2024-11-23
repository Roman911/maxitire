import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { baseDataAPI } from '../../../services/baseDataService';
import { Language } from '../../../models/language';

interface FetchModelProps {
	model: string
	lang: Language
}

export const FetchModel: FC<FetchModelProps> = ({ model, lang }) => {
	const { data } = baseDataAPI.useFetchModelQuery(model);
	const titleBrand = data?.descr?.[lang].meta_title;
	const descriptionBrand = data?.descr?.[lang].meta_description;

	return <Helmet>
		<title>{ titleBrand }</title>
		<meta name='description' content={ descriptionBrand }/>
	</Helmet>
};
