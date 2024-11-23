import { FC, MouseEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addToStorage, getFromStorage, removeFromStorage } from '../../../lib';
import { addBookmarks, removeBookmarks } from '../../../store/reducers/bookmarksSlice';

import type { Product } from '../../../models/products';
import { ProductCardComponent } from '../../../components/ProductCard'
import { Section } from '../../../models/filter';

const cargo = ['3','4','5','6','9','10','11'];

const toggleStorageItem = (storageKey: string, id: number, section: string, isInStorage: boolean) => {
	if (isInStorage) {
		removeFromStorage(storageKey, id);
	} else {
		const storage = getFromStorage(storageKey) || [];
		addToStorage(storageKey, [...storage, { id, section }]);
	}
};

interface ProductCardProps {
	item: Product
}

export const ProductCard: FC<ProductCardProps> = ({ item }) => {
	const dispatch = useAppDispatch();
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const isBookmarks = bookmarksItems.some(i => i.id === item.group);
	const section = item.vehicle_type ? Section.Tires : item.diameter ? Section.Disks : Section.Battery;
	const sectionNew = section === Section.Tires ? cargo.includes(item.vehicle_type) ? 'cargo' : 'tires' : section;

	const handleToggle = (
		event: MouseEvent<HTMLButtonElement>,
		id: number,
		isItem: boolean,
		addAction: ({ id, section }: { id: number, section: string }) => { type: string, payload: { id: number, section: string }}, // Ensure actions return objects
		removeAction: ( id: number ) => { type: string, payload: number },
		storageKey: string
	) => {
		event.preventDefault();
		dispatch(isItem ? removeAction(id) : addAction({ id, section: sectionNew }));
		toggleStorageItem(storageKey, id, sectionNew, isItem);
	};

	return <ProductCardComponent
		item={ item }
		isBookmarks={ isBookmarks }
		addToDefense={(e) => handleToggle(e, item.group, isBookmarks, addBookmarks, removeBookmarks, 'reducerBookmarks')}
	/>
};
