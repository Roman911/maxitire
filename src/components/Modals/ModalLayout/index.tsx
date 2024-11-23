import {FC, type MouseEventHandler, ReactNode, RefObject} from 'react';
import classNames from 'classnames';

import { CloseButton } from '../../Lib';

interface ModalLayoutProps {
	children: ReactNode
	handleClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement>
	rootRef: RefObject<HTMLDivElement>
	size: string
}

export const ModalLayout: FC<ModalLayoutProps> = ({ children, handleClose, rootRef, size }) => {
	return (
		<div className="relative z-10">
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div
					data-testid="wrap"
					className="flex min-h-full items-start justify-center p-4 text-center sm:p-0"
				>
					<div
						ref={ rootRef }
						className={classNames('relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full', size)}>
						<CloseButton handleClick={ handleClose }/>
						{children}
					</div>
				</div>
			</div>
		</div>
	)
};
