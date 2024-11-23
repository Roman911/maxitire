import React from 'react';

import type { IconProps } from '../../../models/icon';

export const CloseMenuIcon: React.FC<IconProps> = ({ className = 'fill-black' }) => {
	return <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none" className={ className }>
		<rect x="1.41406" y="0.213257" width="30" height="2" transform="rotate(45 1.41406 0.213257)"/>
		<rect x="0.414062" y="21.2133" width="30" height="2" transform="rotate(-45 0.414062 21.2133)"/>
	</svg>
}
