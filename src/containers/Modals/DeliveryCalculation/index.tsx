import { FC, useState } from 'react';

import { DeliveryCalculationComponent } from '../../../components/Modals';

interface DeliveryCalculationProps {
	offer_id: number | undefined
	handleModalClose: () => void
}

export const DeliveryCalculation: FC<DeliveryCalculationProps> = ({ offer_id, handleModalClose }) => {
	const [quantity, setQuantity] = useState(1);
	const [showDescription, setShowDescription] = useState<boolean>(false);

	const onSetQuantity = (_: number,quan: number) => {
		setQuantity(quan);
	}

	const handleClick = () => {
		setShowDescription(true);
	}

	const onChange = (e: { target: HTMLInputElement }) => {
		const value = e.target.value;
		const onlyNumbers = value.replace(/\D/g, '');
		const numericValue = Number(onlyNumbers);

		setQuantity(numericValue < 99 ? numericValue : 99);
	}

	return <DeliveryCalculationComponent
		offer_id={ offer_id }
		quantity={ quantity }
		handleClick={ handleClick }
		onChange={ onChange }
		onSetQuantity={ onSetQuantity }
		handleModalClose={ handleModalClose }
		showDescription={ showDescription }
	/>
};
