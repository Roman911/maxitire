import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addToStorage, getFromStorage, removeFromStorage } from '../../../lib';
import { addBookmarks, removeBookmarks } from '../../../store/reducers/bookmarksSlice';
import { addComparison, removeComparison } from '../../../store/reducers/comparisonSlice';
import { ActionsBlockComponent } from '../../../components/Product/ActionsBlock';

// Helper function to update local storage
const updateStorage = (storageKey: string, id: number, section: string, shouldRemove: boolean) => {
	if (shouldRemove) {
		removeFromStorage(storageKey, id);
	} else {
		const storage = getFromStorage(storageKey) || [];
		addToStorage(storageKey, [...storage, { id, section }]);
	}
};

interface ActionsBlockProps {
	id: number
	className: string
	section: string
	handleModalOpen: (type: 'QuickOrder' | 'OnlineInstallment' | 'DeliveryCalculation' | 'Callback' | 'AddAsk') => void
}

export const ActionsBlock: FC<ActionsBlockProps> = ({ id, className, handleModalOpen, section }) => {
	const dispatch = useAppDispatch();
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const isBookmarks = bookmarksItems.some(item => item.id === id);
	const isComparison = comparisonItems.some(item => item.id === id);

	// Toggle bookmarks
	const handleClickBookmarks = () => {
		dispatch(isBookmarks ? removeBookmarks(id) : addBookmarks({ id, section }));
		updateStorage('reducerBookmarks', id, section, isBookmarks);
	};

	// Toggle comparison
	const handleClickComparison = () => {
		dispatch(isComparison ? removeComparison(id) : addComparison({ id, section }));
		updateStorage('reducerComparison', id, section, isComparison);
	};

	const openModal = (type: 'QuickOrder' | 'OnlineInstallment' | 'DeliveryCalculation' | 'Callback' | 'AddAsk') => {
		handleModalOpen(type);
	}

	return <ActionsBlockComponent
		className={ className }
		isBookmarks={ isBookmarks }
		isComparison={ isComparison }
		handleClickBookmarks={ handleClickBookmarks }
		handleClickComparison={ handleClickComparison }
		openModal={ openModal }
	/>;
};
