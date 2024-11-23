import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SuccessfulOrderComponent } from '../../components/SuccessfulOrder';

export const SuccessfulOrder = () => {
	const [ quickOrder, setQuickOrder ] = useState(false);
	const params = useParams();

	useEffect(() => {
		if(params['*']) {
			setQuickOrder(true);
		}
	}, [params]);
	
	return <SuccessfulOrderComponent quickOrder={ quickOrder } />
};
