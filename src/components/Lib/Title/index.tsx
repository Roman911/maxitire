import { FC } from 'react';

import { useAppTranslation } from '../../../hooks';

interface TitleProps {
	isMain?: boolean
	title: string
	className?: string
}

export const Title: FC<TitleProps> = ({ isMain, title, className='my-5 text-3xl md:text-4xl font-bold px-3 md:px-0' }) => {
	const t = useAppTranslation();

	if(isMain) return <h1 className={className}>{t(title, true)}</h1>

	return <h2 className={className}>{t(title, true)}</h2>
};
