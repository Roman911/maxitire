import { FC } from 'react';

import { Link } from '../../../lib';

interface PopularItemProps {
	label: string
	link: string
}

export const PopularItem: FC<PopularItemProps> = ({ label, link }) => {
	return <Link
		className={'block text-center rounded-full bg-white border border-blue-500 w-full py-1.5 mb-2.5 transition hover:bg-[#DCEAFE] hover:text-[#024987]'}
		to={ `/catalog/tires${ link }` }
	>
		{ label }
	</Link>
};
