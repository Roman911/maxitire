import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import { Language } from '../models/language';

import ua from '../locales/ua.json';
import ru from '../locales/ru.json';

const resources = {
	ua: {
		translation: ua,
	},
	ru: {
		translation: ru,
	},
}

i18n
	.use(initReactI18next)
	.init({
		lng: Language.UA,
		resources,
		fallbackLng: Language.UA,
	}).then(r => r);

export default i18n