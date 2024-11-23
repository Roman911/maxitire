import { useLocation } from 'react-router-dom';

import { baseDataAPI } from '../../services/baseDataService';
import { useAppSelector } from '../../hooks';
import { LayoutStaticPage } from './Layout';

export const Alias = () => {
	const { data: aliasAll } = baseDataAPI.useFetchStatiAliasAllQuery('');
	const location = useLocation();
	const pathname = location.pathname.split('/');
	const slug = pathname[pathname.length - 1];
	const aliasItem = aliasAll?.header.find(item => item.slug === slug);
	const { lang } = useAppSelector(state => state.langReducer);
	const { data, isLoading } = baseDataAPI.useFetchStatiAliasQuery( aliasItem ? `${aliasItem.article_id}` : '1');

	if(data?.[slug]) {
		return <LayoutStaticPage title={ data ? data?.[slug].description[lang].title : '' } data={ data?.[slug] } isLoading={ isLoading } lang={ lang } />
	}

	return <div className='min-h-[70vh]' />
};
