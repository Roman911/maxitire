import React from 'react';

import type { IconProps } from '../../../models/icon';

export const FacebookIcon: React.FC<IconProps> = ({ className = 'fill-black' }) => {
	return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={ className }>
		<path
			d="M9.53521 22H13.7676V13.5684H17.581L18 9.37895H13.7676V7.26316C13.7676 6.98398 13.8791 6.71624 14.0775 6.51884C14.2759 6.32143 14.5451 6.21053 14.8257 6.21053H18V2H14.8257C13.4226 2 12.0769 2.55451 11.0848 3.54154C10.0926 4.52858 9.53521 5.86728 9.53521 7.26316V9.37895H7.41901L7 13.5684H9.53521V22Z"
		/>
	</svg>
}
