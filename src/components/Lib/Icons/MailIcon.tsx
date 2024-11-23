import React from 'react';

import type { IconProps } from '../../../models/icon';

export const MailIcon: React.FC<IconProps> = ({ className = 'stroke-black' }) => {
	return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className={ className }>
		<path
			d="M13.6 3H2.4C1.6268 3 1 3.61561 1 4.375V12.625C1 13.3844 1.6268 14 2.4 14H13.6C14.3732 14 15 13.3844 15 12.625V4.375C15 3.61561 14.3732 3 13.6 3Z"
			strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
		<path
			d="M15 5.0625L8.721 8.98125C8.50489 9.11423 8.25502 9.18476 8 9.18476C7.74498 9.18476 7.49511 9.11423 7.279 8.98125L1 5.0625"
			strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
}
