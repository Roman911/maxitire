import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks';
import { reset as resetBookmarks } from '../../store/reducers/bookmarksSlice';
import { reset as resetCart } from '../../store/reducers/cartSlice';

export const FlushCache = () => {
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		dispatch(resetBookmarks());
		dispatch(resetCart());
		localStorage.clear();
		sessionStorage.clear();
	}, [dispatch]);

	return <div>
		status: ok
	</div>
};