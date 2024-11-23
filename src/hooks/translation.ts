import { useTranslation } from 'react-i18next';

export const useAppTranslation = (): ( text: string, up?: boolean ) => string => {
	const { t } = useTranslation();

	return ( text: string, up?: boolean ): string => {
		const translatedText = t(text);
		return up && translatedText
			? translatedText.charAt(0).toUpperCase() + translatedText.slice(1)
			: translatedText;
	};
};
