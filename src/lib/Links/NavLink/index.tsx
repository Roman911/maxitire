import { FC, ReactNode } from 'react';
import { NavLink as _NavLink } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';
import { Language } from "../../../models/language.ts";

interface NavLinkProps {
	to: string
	className?: string
	children: ReactNode
	onClick?: () => void
}

export const NavLink: FC<NavLinkProps> = ({ children, to, className, onClick }) => {
	const { lang } = useAppSelector(state => state.langReducer);

	const newPath = lang === Language.UA ? to : `/ru${to}`;

	return <_NavLink to={ newPath } className={ className } onClick={ onClick } >
		{ children }
	</_NavLink>
};
