import { memo } from 'react';
import DOMPurify from 'dompurify';

import './index.scss';
import { useAppSelector } from '../../../hooks';

export const TextSeo = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);

	const HtmlContent = memo(({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString);
		return (
			<div
				className="seo-text container mx-auto max-w-7xl mt-20 mb-24 px-2"
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		);
	});

	return <HtmlContent htmlString={ settings[lang].description } />
};
