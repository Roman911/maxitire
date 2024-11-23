import { FC } from "react";
import { twMerge } from 'tailwind-merge';

import { Section } from '../../../../models/filter';

interface TabProps {
	name: Section
	section: Section
	isOpen: boolean
	handleClick: (value: Section) => void
	label: string
}

export const Tab: FC<TabProps> = ({ name, section, handleClick, label }) => {
	const buttonClassNames = twMerge('text-base xl:text-xl leading-7 uppercase font-bold md:mr-1.5 xl:mr-2.5 py-3 w-full md:w-auto relative',
		section === name ? 'md:pointer-events-none bg-gradient-to-b from-amber-400 to-orange-600 bg-clip-text text-transparent before:absolute before:bottom-0 before:bg-gradient-to-r before:from-amber-400 before:to-orange-600 before:w-full before:h-1' : 'text-white');

	return (
		<div className='w-full md:w-auto mt-2.5 md:mt-0'>
			<button onClick={ () => handleClick(name) } className={ buttonClassNames }>
				{ label }
			</button>
		</div>
	);
};
