import { FC, type MouseEventHandler } from 'react';

interface CloseButtonProps {
	handleClick: MouseEventHandler<HTMLDivElement | HTMLButtonElement>
}

export const CloseButton: FC<CloseButtonProps> = ({ handleClick }) => {
	return (
		<button
			className='absolute right-3 top-3 transition duration-150 ease-in text-gray-400 hover:text-gray-500'
			onClick={ handleClick }
		>
			<i className='icon iconfont-close'></i>
		</button>
	)
};
