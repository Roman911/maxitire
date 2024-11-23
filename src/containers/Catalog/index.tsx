import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { baseDataAPI } from '../../services/baseDataService';
import { SeasonTransform } from '../../lib';
import { useAppDispatch, useAppSelector, useAppTranslation } from '../../hooks';
import { setParams, changeSection, resetFilter } from '../../store/reducers/filterSlice';

import { parseUrl } from './seo';
import { FilterAlt } from './FilterAlt';
import { CatalogContent } from './CatalogContent';
import { LayoutWrapper } from '../../components/Layout';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Support } from '../Layout/Support';
import { Section } from '../../models/filter';
import { FetchBrand } from './FetchBrand';
import { FetchModel } from './FetchModel';
import { Title } from '../../components/Lib';
import { Language } from '../../models/language';

interface UrlParams {
	sezon?: string;
	brand?: string;
	width?: string;
	height?: string;
	radius?: string;
}

interface Brand {
	label: string;
	value: number;
}

export const Catalog = () => {
	const [ isOpenFilter, setOpenFilter ] = useState(false);
	const [ urlParams, setUrlParams ] = useState<UrlParams>({});
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { settings } = useAppSelector(state => state.settingsReducer);
	const { filter, section } = useAppSelector(state => state.filterReducer);
	const { brand, model } = useAppSelector(state => state.brandAliasReducer);
	const { lang } = useAppSelector(state => state.langReducer);
	const t = useAppTranslation();
	const dispatch = useAppDispatch();
	const params = useParams();
	const brandParam: Brand | null = urlParams.brand
		? section === Section.Tires
			? data?.brand.find(item => item.value === +urlParams.brand!) ?? null
			: section === Section.Disks
				? data?.brand_disc.find(item => item.value === +urlParams.brand!) ?? null
				: null
		: null;
	const title = `${urlParams.sezon ? t(SeasonTransform(urlParams.sezon)?.name || '', true) : ''} ${t(section, !(urlParams.sezon && urlParams.brand))} ${brandParam?.label ?? ''} ${urlParams.width ?? ''}${urlParams.width && urlParams.height ? '/' : ''}${urlParams.height ?? ''} ${urlParams.radius ? 'R' + urlParams.radius : ''}`;

	useEffect(() => {
		dispatch(resetFilter());
	}, [dispatch]);

	useEffect(() => {
		if(section !== params.section) {
			dispatch(changeSection(params.section as Section))
		}
	}, [dispatch, params.section, section]);

	useEffect(() => {
		if(params['*']) {
			const url = parseUrl(params['*']);
			setUrlParams(url);
			dispatch(setParams(url));
		} else {
			setUrlParams({});
		}
	}, [dispatch, params]);

	const path = [
		{
			id: 1,
			title: t(section, true),
			url: `/catalog/${section}/`,
		},
		{
			id: 2,
			title: `${t(SeasonTransform(urlParams.sezon ?? '')?.name || '', true)} ${t(section)}`,
			url: urlParams.sezon ? `/catalog/${section}/s-${urlParams.sezon}` : undefined,
		},
		{
			id: 3,
			title: `${typeof brandParam === 'object' && brandParam?.label ? brandParam.label : ''}`,
			url: urlParams.brand ? `/catalog/${section}/b-${urlParams.brand}` : undefined,
		},
		{
			id: 4,
			title: `${t('width', true)} ${urlParams.width}`,
			url: urlParams.width && `/catalog/${section}/w-${urlParams.width}`,
		},
		{
			id: 5,
			title: `${t('height', true)} ${urlParams.height}`,
			url: urlParams.height && `/catalog/${section}/h-${urlParams.height}`,
		},
		{
			id: 6,
			title: `R${urlParams.radius}`,
			url: urlParams.radius && `/catalog/${section}/d-${urlParams.radius}`,
		},
		{
			id: 7,
			title: `${title}`,
			url: Object.keys(urlParams).length > 1 && `/catalog/${section}/`,
		},
	];

	const closeFilter = () => {
		setOpenFilter(false);
	}

	const openFilter = () => {
		setOpenFilter(true);
	}

	const titleDefault = `${title} - ${ lang === Language.UA ? 'Купити гуму за найкращою ціною в Україні' : 'Купить резину по лучшей цене в Украине' } | ${settings.ua.config_name}`;

	return <LayoutWrapper>
		{ (filter?.model_id && model) ? <FetchModel model={ model } lang={ lang } /> :
			(filter?.brand && brand) ? <FetchBrand brand={ brand } lang={ lang } /> :
				<Helmet>
					<title>{titleDefault}</title>
					<meta name='description' content={titleDefault}/>
				</Helmet>
		}
		<Breadcrumbs path={path}/>
		<Title isMain={ true } title={ title } className='mt-3 text-lg font-medium px-0 md:px-3 mb-3 md:mb-1' />
		<div className='md:pt-4 pb-5 lg:flex'>
			<FilterAlt isOpenFilter={ isOpenFilter } closeFilter={ closeFilter } />
			<CatalogContent openFilter={ openFilter } />
		</div>
		<Support />
	</LayoutWrapper>
};
