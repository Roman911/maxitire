import { baseDataAPI } from '../../../services/baseDataService';
import { useAppSelector } from '../../../hooks';
import { LayoutStaticPage } from '../Layout';

const id = '5';
const page = 'contacts';

export const Contacts = () => {
	const { data, isLoading } = baseDataAPI.useFetchStatiAliasQuery(id);
	const { lang } = useAppSelector(state => state.langReducer);
	const title = data ? data?.[page].description[lang].title : '';

	return <LayoutStaticPage title={ title } data={ data?.[page] } isLoading={ isLoading } lang={ lang } />
};
