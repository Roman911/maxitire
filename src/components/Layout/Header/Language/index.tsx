import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames";

import { Language } from '../../../../models/language';

interface LanguageProps {
	lang: Language
	path: string
	onChangeLang: (lang: Language) => void
}

export const LanguageComponent: FC<LanguageProps> = ({ lang, path, onChangeLang }) => {
	const newPath = path.replace(/^\/ru/, '');

	return <div className='divide-x text-gray-500 divide-gray-500'>
		<Link
			to={newPath}
			onClick={() => onChangeLang(Language.UA)}
			className={classNames('font-bold text-sm 2xl:text-base pr-1.5 2xl:pr-3 active:text-white', {'text-white pointer-events-none': lang === Language.UA})}
		>
			UA
		</Link>
		<Link
			to={`/ru${path}`}
			onClick={() => onChangeLang(Language.RU)}
			className={classNames('font-bold text-sm 2xl:text-base pl-1.5 2xl:px-3 active:text-white', {'text-white pointer-events-none': lang === Language.RU})}
		>
			RU
		</Link>
	</div>
}
