import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addToStorage, getFromStorage, removeFromStorage } from '../../../lib';
import { addBookmarks, removeBookmarks } from '../../../store/reducers/bookmarksSlice';
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
	const isBookmarks = bookmarksItems.some(item => item.id === id);

	// Toggle bookmarks
	const handleClickBookmarks = () => {
		dispatch(isBookmarks ? removeBookmarks(id) : addBookmarks({ id, section }));
		updateStorage('reducerBookmarks', id, section, isBookmarks);
	};

	const openModal = (type: 'QuickOrder' | 'OnlineInstallment' | 'DeliveryCalculation' | 'Callback' | 'AddAsk') => {
		handleModalOpen(type);
	}

	return <ActionsBlockComponent
		className={ className }
		isBookmarks={ isBookmarks }
		handleClickBookmarks={ handleClickBookmarks }
		openModal={ openModal }
	/>;
};
