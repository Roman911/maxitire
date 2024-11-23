import { FC } from 'react';
import classNames from 'classnames';

interface BadgeProps {
	value: number
	className?: string
}

export const Badge: FC<BadgeProps> = ({ value, className='left-3.5' }) => {
	const styles = `-top-2.5 absolute ${className}`;

	return (
		<div className={styles}>
			<p className={classNames(
				'flex h-5 w-5 p-2 items-center justify-center rounded-full text-[11px] border-2 border-white font-bold text-white',
				{ 'bg-natural-400': value === 0, 'bg-blue-500': value > 0 }
			)}>
				{ value }
			</p>
		</div>
	)
}
