import React from 'react';

import type { IconProps } from '../../../models/icon';

export const HomeIcon: React.FC<IconProps> = ({ className = 'fill-black' }) => {
	return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none" className={ className }>
		<path fillRule="evenodd" clipRule="evenodd"
					d="M8.42293 0L16 6.89382L15.1541 7.73772L13.9509 6.64897V14.4057L13.3552 15H9.78109L9.18541 14.4057V10.2456H6.80268V14.4057L6.207 15H2.63291L2.03723 14.4057V6.65848L0.845868 7.73772L0 6.89382L7.56515 0H8.42293ZM3.22859 5.57805V13.8114H5.61132V9.65135L6.207 9.05705H9.78109L10.3768 9.65135V13.8114H12.7595V5.57092L7.99404 1.2599L3.22859 5.57805Z"
		/>
	</svg>
}
