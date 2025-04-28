import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { Link } from '../../../lib';
import { useAppDispatch, useAppTranslation } from '../../../hooks';
import { resetFilter, setParams } from '../../../store/reducers/filterSlice';

import { typeCatLinks } from './links';
import type { LinkComponentProps } from '../../../models/linkComponent';

interface TypeCarLinksProps {
	section: 'header' | 'catalog'
	onClick?: () => void
}

interface ILinkComponent extends LinkComponentProps {
	section: 'header' | 'catalog'
	icon: string
	vehicleType: string[]
}

const LinkComponent: FC<ILinkComponent> = (
	{
		section,
		to,
		icon,
		label,
		onClick,
		vehicleType
	}) => {
	const params = useParams();
	const value = params?.['*'] ? params['*'].split("vt-")[1]?.split("/")[0] || null : null;
	const active = value && vehicleType.includes(value);

	return <Link
		to={ to }
		onClick={ onClick }
		className={
			twMerge('flex items-center group', section === 'catalog' && 'flex-col', section === 'header' && 'mt-3 gap-2.5')
		}
	>
		<i className={ `icon iconfont-${ icon }` }></i>
		<span className={
			twMerge('transition group-hover:text-blue-500', active && 'text-blue-500', section === 'catalog' && 'text-sm', section === 'header' && 'group-hover:underline')
		}>
			{ label }
		</span>
	</Link>
}

export const TypeCarLinks: FC<TypeCarLinksProps> = ({ onClick, section }) => {
	const dispatch = useAppDispatch();
	const t = useAppTranslation();

	const handleClick = () => {
		if(onClick) onClick();
		dispatch(resetFilter());
		dispatch(setParams({ 'vehicle_type': null }));
	}

	return <>
		{ typeCatLinks.map(item => {
			return <LinkComponent
				key={ item.label }
				section={ section }
				to={ item.to }
				icon={ item.icon }
				label={ t(item.label, true) }
				onClick={ handleClick }
				vehicleType={ item.vehicleType }
			/>
		}) }
	</>
};
