import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks';
import { reset as resetBookmarks } from '../../store/reducers/bookmarksSlice';
import { reset as resetCart } from '../../store/reducers/cartSlice';
import { reset as resetComparison } from '../../store/reducers/comparisonSlice';

export const FlushCache = () => {
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		dispatch(resetBookmarks());
		dispatch(resetCart());
		dispatch(resetComparison());
		localStorage.clear();
		sessionStorage.clear();
	}, [dispatch]);

	return <div>
		status: ok
	</div>
};