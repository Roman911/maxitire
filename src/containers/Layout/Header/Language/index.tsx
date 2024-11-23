import { useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import i18n from '../../../../lib/i18n';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { changedLang } from '../../../../store/reducers/langSlice';
import { LanguageComponent } from '../../../../components/Layout/Header/Language';

import { Language as LanguageEnum } from '../../../../models/language';

export const Language = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { lang } = useAppSelector(state => state.langReducer);

	const currentLang = useMemo(() => {
		return location.pathname.split('/').includes('ru') ? LanguageEnum.RU : LanguageEnum.UA;
	}, [location.pathname]);

	const handleChangeLanguage = useCallback((lang: LanguageEnum) => {
		i18n.changeLanguage(lang).then(r => r);
		dispatch(changedLang(lang));
	}, [dispatch]);

	useEffect(() => {
		handleChangeLanguage(currentLang);
	}, [currentLang, handleChangeLanguage]);

	return <LanguageComponent lang={ lang } path={ location.pathname } onChangeLang={ handleChangeLanguage } />
}
