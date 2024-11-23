import { FC, memo } from 'react';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';

import { LayoutWrapper } from '../../../components/Layout';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { Spinner, Title } from '../../../components/Lib';
import { Language } from '../../../models/language';

interface Description {
	title: string
	content: string
	meta_h1: string
	meta_title: string
	meta_description: string
}

interface Data {
	alias: string
	created_at: string
	updated_at: string
	description: {
		ua: Description
		ru: Description
	}
}

interface StaticPageProps {
	title: string
	data: Data | undefined
	isLoading: boolean
	lang: Language
}

export const LayoutStaticPage: FC<StaticPageProps> = ({ title, data, isLoading, lang }) => {
	const path = [
		{
			id: 1,
			title: title,
			url: '/'
		}
	];

	const HtmlContent = memo(({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString);
		return (
			<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
		);
	});

	return <LayoutWrapper>
		<Helmet>
			<title>{ data?.description[lang].meta_title }</title>
			<meta name='description' content={ data?.description[lang].meta_description }/>
		</Helmet>
		<Breadcrumbs path={path}/>
		<Spinner height='h-60' show={ isLoading }>
			<Title title={ data ? data?.description[lang].meta_h1 : '' } />
			<HtmlContent htmlString={ data ? data?.description?.[lang].content : '' } />
		</Spinner>
	</LayoutWrapper>
};
