import { useEffect, useState, useRef, ChangeEvent } from 'react';

import { baseDataAPI } from '../../../../services/baseDataService';
import { useAppDispatch } from '../../../../hooks';
import { setSearch } from '../../../../store/reducers/searchSlice';
import { SearchComponent } from '../../../../components/Layout/Header/Search';

const placeHolderExamples = [
	'235/45 R18 RunFlat',
	'Bridgestone 205 55 16',
	'зима 185 65 14',
	'Nexen r15 91H',
	'R22 RunFlat',
	'Nokian R17',
	'Michelin 225 R17',
	'Premiorri Solazo',
	'245 R18 FR',
];

export const Search = () => {
	const [placeholder, setPlaceholder] = useState('');
	const [value, setValue] = useState('');
	const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
	const { data } = baseDataAPI.useFetchProductsQuery({ id: `?name=${value}` })
	const currentLetter = useRef(0);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const typePlaceholder = () => {
			const currentPlaceholder = placeHolderExamples[currentPlaceholderIndex];

			if (currentLetter.current <= currentPlaceholder.length) {
				setPlaceholder(currentPlaceholder.slice(0, currentLetter.current));
				currentLetter.current += 1;
			} else {
				setTimeout(() => {
					placeholderRenderNext();
				}, 1000);
				return;
			}

			const timer = setTimeout(typePlaceholder, 50);
			return () => clearTimeout(timer);
		};

		typePlaceholder();
	}, [currentPlaceholderIndex]);

	const placeholderRenderNext = () => {
		currentLetter.current = 0;
		const nextIndex = (currentPlaceholderIndex + 1) % placeHolderExamples.length;
		setCurrentPlaceholderIndex(nextIndex);
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const handleClick = () => {
		setValue('');
	}

	const handleClickAllProduct = () => {
		dispatch(setSearch(value));
		handleClick();
	}

	return <SearchComponent
		placeholder={ placeholder }
		onChange={ onChange }
		data={ data?.data }
		handleClick={ handleClick }
		value={ value }
		isOpen={ value.length > 2 }
		handleClickAllProduct={ handleClickAllProduct }
	/>;
};
