import React from 'react';

import type { IconProps } from '../../../models/icon';

export const ViberIcon: React.FC<IconProps> = ({ className = 'fill-black' }) => {
	return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={ className }>
		<g clipPath="url(#clip0_49_5723)">
			<path fillRule="evenodd" clipRule="evenodd"
						d="M17.5907 0.618345C13.9086 -0.206115 10.0903 -0.206115 6.40822 0.618345L6.01148 0.706268C4.97576 0.938222 4.02451 1.45324 3.2634 2.19412C2.50229 2.935 1.96112 3.87272 1.7 4.90313C0.766666 8.58714 0.766666 12.4463 1.7 16.1303C1.94902 17.113 2.453 18.0123 3.16084 18.737C3.86869 19.4617 4.75523 19.986 5.7306 20.2569L6.27481 23.5112C6.29218 23.6145 6.33689 23.7113 6.40428 23.7915C6.47168 23.8716 6.55929 23.9322 6.658 23.9669C6.75671 24.0016 6.8629 24.0092 6.96553 23.9888C7.06815 23.9685 7.16345 23.9209 7.24149 23.8511L10.4377 20.9872C12.8369 21.1339 15.2449 20.9417 17.5907 20.4163L17.9886 20.3284C19.0243 20.0964 19.9756 19.5814 20.7367 18.8405C21.4978 18.0996 22.039 17.1619 22.3001 16.1315C23.2333 12.4475 23.2333 8.58832 22.3001 4.9043C22.0389 3.87375 21.4975 2.93592 20.7362 2.19503C19.9749 1.45414 19.0234 0.939201 17.9874 0.70744L17.5907 0.618345ZM7.39598 4.80817C7.17847 4.77646 6.95668 4.82032 6.76751 4.93244H6.75113C6.31226 5.19035 5.91669 5.51508 5.57963 5.89725C5.29875 6.22198 5.14661 6.55022 5.10682 6.86675C5.08341 7.05432 5.0998 7.24423 5.1548 7.42359L5.17587 7.43532C5.49186 8.36496 5.90381 9.25943 6.40705 10.1011C7.05594 11.2834 7.85446 12.3768 8.78281 13.3543L8.8109 13.3942L8.85537 13.427L8.88229 13.4586L8.91506 13.4868C9.8943 14.4195 10.9884 15.2232 12.1709 15.8783C13.5226 16.6157 14.343 16.9638 14.8357 17.1092V17.1162C14.9797 17.1608 15.1108 17.1807 15.243 17.1807C15.6626 17.1497 16.0598 16.9788 16.3712 16.6954C16.7516 16.3578 17.0734 15.9603 17.3238 15.5184V15.5102C17.5591 15.0647 17.4795 14.645 17.1401 14.3601C16.4584 13.7635 15.7212 13.2335 14.9387 12.7775C14.4144 12.4927 13.8819 12.665 13.6666 12.9534L13.2066 13.5348C12.9702 13.8232 12.5419 13.7834 12.5419 13.7834L12.5302 13.7904C9.33404 12.9733 8.48087 9.73187 8.48087 9.73187C8.48087 9.73187 8.44108 9.29108 8.73717 9.066L9.31297 8.60176C9.58917 8.37668 9.7811 7.84445 9.48501 7.31926C9.0328 6.53471 8.50479 5.79652 7.90858 5.11532C7.77854 4.955 7.59618 4.84581 7.39364 4.807L7.39598 4.80817ZM12.7959 3.39906C12.6407 3.39906 12.4918 3.46082 12.3821 3.57074C12.2723 3.68067 12.2107 3.82976 12.2107 3.98521C12.2107 4.14067 12.2723 4.28976 12.3821 4.39969C12.4918 4.50961 12.6407 4.57137 12.7959 4.57137C14.2763 4.57137 15.5052 5.05553 16.4777 5.984C16.9774 6.49161 17.3671 7.093 17.6223 7.75184C17.8786 8.41185 17.9956 9.11641 17.9652 9.82214C17.962 9.89911 17.9739 9.97597 18.0003 10.0483C18.0267 10.1207 18.0671 10.1871 18.1192 10.2438C18.2243 10.3584 18.3706 10.4264 18.5258 10.4329C18.681 10.4394 18.8324 10.3839 18.9467 10.2786C19.0611 10.1733 19.129 10.0268 19.1355 9.87137C19.1718 9.00326 19.028 8.13705 18.713 7.32746C18.3967 6.51404 17.9171 5.7743 17.304 5.15401L17.2922 5.14228C16.0856 3.98756 14.5584 3.39906 12.7959 3.39906ZM12.7561 5.32633C12.6009 5.32633 12.452 5.38809 12.3423 5.49802C12.2326 5.60794 12.1709 5.75703 12.1709 5.91249C12.1709 6.06795 12.2326 6.21704 12.3423 6.32696C12.452 6.43689 12.6009 6.49864 12.7561 6.49864H12.776C13.8433 6.57484 14.6204 6.93122 15.1646 7.51621C15.7228 8.11877 16.0119 8.86788 15.9897 9.794C15.9861 9.94946 16.0443 10.1 16.1515 10.2124C16.2588 10.3249 16.4062 10.3901 16.5614 10.3936C16.7166 10.3972 16.8668 10.3389 16.9791 10.2315C17.0914 10.1241 17.1564 9.97642 17.16 9.82096C17.1881 8.60528 16.7972 7.55606 16.0224 6.71904V6.71669C15.2301 5.8656 14.1429 5.41543 12.8345 5.32751L12.8146 5.32516L12.7561 5.32633ZM12.7338 7.28995C12.6555 7.28303 12.5766 7.29199 12.5018 7.31628C12.4271 7.34058 12.3579 7.37973 12.2986 7.43138C12.2393 7.48303 12.1909 7.54612 12.1564 7.6169C12.122 7.68769 12.1021 7.7647 12.098 7.84334C12.0939 7.92198 12.1057 8.00064 12.1326 8.07462C12.1596 8.14861 12.2011 8.2164 12.2548 8.27395C12.3084 8.3315 12.3731 8.37762 12.445 8.40957C12.5168 8.44153 12.5944 8.45865 12.673 8.45992C13.1622 8.48571 13.4746 8.63342 13.6713 8.83154C13.869 9.03083 14.0165 9.35087 14.0434 9.85144C14.0449 9.9301 14.0621 10.0077 14.0942 10.0795C14.1262 10.1513 14.1723 10.216 14.2298 10.2696C14.2873 10.3232 14.355 10.3647 14.4288 10.3915C14.5026 10.4184 14.5811 10.43 14.6595 10.4259C14.738 10.4217 14.8147 10.4018 14.8853 10.3672C14.9559 10.3327 15.0188 10.2843 15.0703 10.2249C15.1218 10.1655 15.1608 10.0963 15.1851 10.0215C15.2093 9.94664 15.2183 9.86769 15.2114 9.78931C15.174 9.08593 14.9539 8.4646 14.5034 8.0074C14.0504 7.5502 13.4337 7.32747 12.7338 7.28995Z"
			/>
		</g>
	</svg>
}