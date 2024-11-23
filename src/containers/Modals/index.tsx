import { ReactNode, useEffect, useRef, useState, type MouseEventHandler } from 'react';

import Portal, { createContainer } from '../Portal';
//import { useClickOutside } from '../../hooks';
import { ModalLayout } from '../../components/Modals/ModalLayout';

const MODAL_CONTAINER_ID = 'modal-container-id';

type Props = {
	size: string;
	onClose: () => void;
	children: ReactNode | ReactNode[];
};

const Modal = (props: Props) => {
	const { onClose, size, children } = props;
	const rootRef = useRef<HTMLDivElement>(null);
	const [ isMounted, setMounted ] = useState(false);

	// useClickOutside({ ref: rootRef, open: isMounted, onClose })

	useEffect(() => {
		createContainer({ id: MODAL_CONTAINER_ID });
		setMounted(true);
	}, []);

	const handleClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = () => {
		onClose && onClose();
	};

	return isMounted ? (
		<Portal id={ MODAL_CONTAINER_ID }>
			<ModalLayout
				handleClose={ handleClose }
				rootRef={ rootRef }
				size={ size }
			>
				{ children }
			</ModalLayout>
		</Portal>
	) : null;
};

export default Modal;
