import { baseDataAPI } from '../../../services/baseDataService';
import { useAppSelector } from '../../../hooks';
import { LayoutStaticPage } from '../Layout';

const id = '6';
const page = 'credit';

export const Credit = () => {
	const { data, isLoading } = baseDataAPI.useFetchStatiAliasQuery(id);
	const { lang } = useAppSelector(state => state.langReducer);
	const title = data ? data?.[page].description[lang].title : '';

	return <LayoutStaticPage title={ title } data={ data?.[page] } isLoading={ isLoading } lang={ lang } />
};
