import { FC } from 'react';
import classNames from 'classnames';

import { Link } from '../../../../../lib';
import type { LinkComponentProps } from '../../../../../models/linkComponent';

export const LinkComponent: FC<LinkComponentProps> = ({to, onClick, img, label, mt, border }) => {
	return <Link
		to={to}
		onClick={onClick}
		className={classNames('flex items-center gap-2.5 group', mt,
			{'w-12 lg:w-14 h-10 text-sm lg:text-base justify-center font-medium border border-[#DCDEE0] rounded-md transition hover:bg-slate-200': border})}
	>
		{img && <img src={`/images/${img}.svg`} alt=""/>}
		<span className={classNames({'transition group-hover:text-blue-500 group-hover:underline': !border})}>
			{label}
		</span>
	</Link>
};
