import { FC, ReactNode } from 'react';
import { Link as _Link } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';
import { Language } from '../../../models/language';

interface LinkProps {
	to: string
	className?: string
	children: ReactNode
	onClick?: () => void
}

export const Link: FC<LinkProps> = ({ children, to, className, onClick  }) => {
	const { lang } = useAppSelector(state => state.langReducer);

	const newPath = lang === Language.UA ? to : `/ru${to}`;

	return <_Link to={ newPath } className={ className } onClick={ onClick } >
		{ children }
	</_Link>
};
