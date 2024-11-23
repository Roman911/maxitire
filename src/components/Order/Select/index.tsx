import { Dispatch, FC, SetStateAction } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';

import { useAppSelector } from '../../../hooks';
import { Language } from '../../../models/language';
import type { Options } from '../../../models/baseData';

interface SelectProps {
	name: string
	label: string
	isDisabled?: boolean
	setState?: Dispatch<SetStateAction<string | undefined>>
	options: Options[] | undefined
	onChange: (name: string, value: number | string | undefined, label?: number | string | undefined) => void
}

type IsMulti = false;

const colourStyles: StylesConfig<Options | undefined, IsMulti> = {
	control: (styles) => ({
		...styles,
		marginTop: '8px',
		padding: '8px 4px 8px 4px',
		borderColor: '#EBECF0',
		backgroundColor: 'rgba(255, 255, 255, 0.16)',
		':hover': {
			borderColor: '#8CC9FF',
			boxShadow: '0 0 0 1px #8CC9FF',
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
		//color: '#FFFFFF',
	}),
	placeholder: (styles) => ({
		...styles,
		fontSize: 16,
		fontWeight: 500,
		color: '#050000',
	}),
	indicatorSeparator: (styles) => ({
		...styles,
		display: 'none'
	}),
	dropdownIndicator: (styles) => ({
		...styles,
		color: '#707680',
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

export const MySelect: FC<SelectProps> = (
	{
		name,
		label,
		options = [],
		isDisabled = false,
		onChange,
		setState,
	}) => {
	const { lang } = useAppSelector(state => state.langReducer);

	const handleChange = (value: SingleValue<Options | undefined>) => {
		onChange(name, value?.value, value?.label);
	}

	const handleInputChange = (newValue: string) => {
		const cleanedText = newValue.replace(/[^а-яА-ЯіїєґІЇЄҐ' ]/g, '');
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		setState && setState(cleanedText?.toString());
	}

	return <Select
		options={ options }
		styles={ colourStyles }
		placeholder={ label }
		isClearable={ true }
		isDisabled={ isDisabled }
		onChange={ handleChange }
		noOptionsMessage={ () => lang === Language.UA ? 'Збігів не знайдено' : 'Совпадений не найдено' }
		onInputChange={ handleInputChange }
	/>
};
