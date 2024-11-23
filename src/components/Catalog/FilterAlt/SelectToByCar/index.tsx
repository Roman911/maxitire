import { FC } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';

import { useAppSelector } from '../../../../hooks';
import { Language } from '../../../../models/language';
import type { Options } from '../../../../models/baseData';

interface SelectProps {
	name: string
	label: string
	isDisabled?: boolean
	options: Options[] | undefined
	onChange: (name: string, value: number | string | undefined) => void
	defaultValue?: Options | undefined
}

type IsMulti = false;

const colourStyles: StylesConfig<Options | undefined, IsMulti> = {
	control: (styles, { isDisabled }) => ({
		...styles,
		padding: '5px 0 5px 4px',
		borderColor: isDisabled ? 'rgba(235,236,240,0.45)' : '#EBECF0',
		backgroundColor: isDisabled ? 'rgba(235,236,240,0.65)' : '#EBECF0',
		':hover': {
			borderColor: '#EBECF0',
			boxShadow: 'none',
		},
	}),
	input: (styles) => ({
		...styles,
		fontSize: 16,
		fontWeight: 500,
	}),
	singleValue: (styles) => ({
		...styles,
		fontSize: 16,
		fontWeight: 500,
	}),
	placeholder: (styles, { isDisabled}) => ({
		...styles,
		fontSize: 16,
		fontWeight: 500,
		color: isDisabled ? 'rgba(5,0,0,0.25)' : '#050000',
	}),
	indicatorSeparator: (styles) => ({
		...styles,
		display: 'none'
	}),
	dropdownIndicator: (styles, { isDisabled}) => ({
		...styles,
		color: isDisabled ? 'rgba(112,118,128,0.25)' : '#707680',
		':hover': {
			color: '#707680',
		},
	}),
	clearIndicator: (styles) => ({
		...styles,
		color: '#707680',
		':hover': {
			color: '#707680',
		},
	}),
	menuList: (provided) => {
		return {
			...provided,
			'::-webkit-scrollbar': {
				width: '10px',
				borderRadius: '6px',
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

export const MySelect: FC<SelectProps> = ({ name, label, options = [], isDisabled = false, onChange, defaultValue }) => {
	const { lang } = useAppSelector(state => state.langReducer);

	const handleChange = (value: SingleValue<Options | undefined>) => {
		onChange(name, value?.value);
	}

	return <Select
		options={ options }
		styles={ colourStyles }
		placeholder={ label }
		isClearable={ true }
		isDisabled={ isDisabled }
		onChange={ handleChange }
		defaultValue={ defaultValue }
		noOptionsMessage={ () => lang === Language.UA ? 'Збігів не знайдено' : 'Совпадений не найдено' }
	/>
}
