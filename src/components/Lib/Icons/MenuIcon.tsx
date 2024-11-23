import React from 'react';

import type { IconProps } from '../../../models/icon';

export const MenuIcon: React.FC<IconProps> = ({ className = 'fill-black' }) => {
	return <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none" className={ className }>
		<rect y="6" width="30" height="2"/>
		<rect y="14" width="30" height="2"/>
		<rect y="22" width="30" height="2"/>
	</svg>
}
