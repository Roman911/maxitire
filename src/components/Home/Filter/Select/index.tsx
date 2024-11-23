import { FC, useCallback, useRef } from 'react';
import Select, { GroupBase, SelectInstance, SingleValue, StylesConfig } from 'react-select';

import { useAppSelector } from '../../../../hooks';
import { Language } from '../../../../models/language';
import type { Options } from '../../../../models/baseData';

interface SelectProps {
	name: string
	label: string
	isDisabled?: boolean
	focusValue?: string
	options: Options[] | undefined
	onChange: (name: string, value: number | string | undefined) => void
}

type IsMulti = false;

const colourStyles: StylesConfig<Options | undefined, IsMulti> = {
	control: (styles) => ({
		...styles,
		padding: '5px 4px 5px 16px',
		borderColor: 'transparent',
		backgroundColor: 'rgba(255,255,255,0.9)',
		':hover': {
			borderColor: '#8CC9FF',
			boxShadow: '0 0 0 1px #8CC9FF',
		}
	}),
	singleValue: (styles) => ({
		...styles,
		fontSize: 18,
		fontWeight: 500,
		color: '#050505',
	}),
	placeholder: (styles) => ({
		...styles,
		fontSize: 18,
		fontWeight: 500,
		color: '#050505',
	}),
	indicatorSeparator: (styles) => ({
		...styles,
		display: 'none'
	}),
	dropdownIndicator: (styles) => ({
		...styles,
		color: '#A8ACB2',
		':hover': {
			color: '#A8ACB2',
		},
	}),
	clearIndicator: (styles) => ({
		...styles,
		color: '#A8ACB2',
		':hover': {
			color: '#A8ACB2',
		},
	}),
	menuList: (provided) => {
		return {
			...provided,
			'::-webkit-scrollbar': {
				width: '10px',
				borderRadius: '2px',
				backgroundColor: '#E4E4E5',
			},
			'::-webkit-scrollbar-thumb': {
				backgroundColor: '#ABAFB2',
				border: '2px solid #E4E4E5',
				borderRadius: '6px',
			}
		};
	},
};

export const MySelect: FC<SelectProps> = ({ name, label, options = [], focusValue, isDisabled = false, onChange }) => {
	const { lang } = useAppSelector(state => state.langReducer);
	const ref = useRef<SelectInstance<Options, IsMulti, GroupBase<Options>> | null>(null);

	const onMenuOpen = useCallback( () => {
		if (focusValue) {
			setTimeout(() => {
				const selectedEl = ref.current?.menuListRef;
				const cont = selectedEl?.querySelectorAll('.MyDropdown__option') || [];

				// Find the index of the element with the matching textContent
				const elIndex = Array.from(cont).findIndex(el => el.textContent === focusValue);

				if (elIndex !== -1) {
					// Scroll to the found option
					selectedEl?.scroll(0, elIndex * 40);
				}
			}, 15);  // Adjusted delay
		}
	}, [focusValue]);

	const handleChange = (value: SingleValue<Options | undefined>) => {
		onChange(name, value?.value);
	}
	
	return <Select
		options={ options }
		ref={ ref as never }
		onMenuOpen={ onMenuOpen }
		styles={ colourStyles }
		placeholder={ label }
		isClearable={ true }
		isDisabled={ isDisabled }
		onChange={ handleChange }
		className='MyDropdown'
		classNamePrefix='MyDropdown'
		noOptionsMessage={ () => lang === Language.UA ? 'Збігів не знайдено' : 'Совпадений не найдено' }
	/>
};
