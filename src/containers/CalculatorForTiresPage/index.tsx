import { useCallback, useEffect, useState } from 'react';
import Iframe from 'react-iframe';
import { Helmet } from 'react-helmet-async';

import { config } from '../../config';
import { useAppSelector, useAppTranslation } from '../../hooks';
import { LayoutWrapper } from '../../components/Layout';
import { Title } from '../../components/Lib';
import { Language } from '../../models/language';

export const CalculatorForTires = () => {
	const [height, setHeight] = useState('0px');
	const { lang } = useAppSelector(state => state.langReducer);
	const t = useAppTranslation();

	const changeHeight = useCallback(() => {
		const iframe = document.getElementById('tireCalculator') as HTMLIFrameElement | null;

		if (iframe && iframe.contentWindow) {
			const content = iframe.contentWindow.document.querySelector('#content');

			if (content) {
				setHeight(content.clientHeight + 60 + 'px');
			}
		}
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const iframe = document.getElementById('tireCalculator') as HTMLIFrameElement | null;

		if (iframe) {
			iframe.addEventListener('load', changeHeight);
		}

		return () => {
			if (iframe) {
				iframe.removeEventListener('load', changeHeight);
			}
		};
	}, [changeHeight]);

	return <LayoutWrapper>
		<Helmet>
			<title>{ t('tire calculator', true) } | { config.domain }</title>
		</Helmet>
		<Title title='tire calculator'/>
		<Iframe url={`/calc/kalkulator${lang === Language.UA ? '_ua' : ''}.htm?background=2772E2`}
						width="100%"
						height={height}
						id="tireCalculator"
						className=""
						display="block"
						loading='lazy'
						position="relative"/>
	</LayoutWrapper>
};
