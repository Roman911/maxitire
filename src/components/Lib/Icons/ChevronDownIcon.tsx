import React from 'react';

import type { IconProps } from '../../../models/icon';

export const ChevronDownIcon: React.FC<IconProps> = ({ className = 'stroke-black' }) => {
	return <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" className={ className }>
		<path d="M1 2.75L5 6.75L9 2.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
}
