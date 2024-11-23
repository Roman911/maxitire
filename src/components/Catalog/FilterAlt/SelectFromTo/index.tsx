import { FC, useState } from 'react';

import { useAppDispatch, useAppSubmit, useAppTranslation } from '../../../../hooks';
import { setParams } from '../../../../store/reducers/filterSlice';

interface SelectFromTo {
	name: string
	nameMin: string
	nameMax: string
	from: number
	to: number
	title: string
	btnTitle: string
	minus?: boolean
	closeFilter: () => void
}

export const SelectFromTo: FC<SelectFromTo> = ({ nameMin, nameMax,  from, to, title, btnTitle, minus, closeFilter }) => {
	const [minMax, setMinMax] = useState({ min: '', max: '' });
	const dispatch = useAppDispatch();
	const { handleSubmit } = useAppSubmit();
	const t = useAppTranslation();

	const onChange = (param: string, value: string) => {
		const onlyNumbers = value.replace(minus ? /[^\d-]/g : /\D/g, '');
		const updatedMinMax = { ...minMax, [param]: onlyNumbers };
		setMinMax(updatedMinMax);

		const updateParams = (key: string, val: string) => {
			dispatch(setParams({ [key]: val.length > 0 ? val : null })); // Simplify conditional logic
		};

		// Update parameters dynamically using the updated values
		updateParams(nameMin, updatedMinMax.min);
		updateParams(nameMax, updatedMinMax.max);
	};

	const handleClick = () => {
		closeFilter();
		handleSubmit();
	};

	return <div className='mt-5'>
		<div className='text-sm font-bold text-gray-500 uppercase'>{ title }</div>
		<div className='flex gap-2 mt-3'>
			<div
				className='flex h-10 rounded mx-auto bg-white p-0.5 mt-4 lg:mt-0 border border-gray-300 w-full lg:max-w-[600px]'>
				<input
					type="text"
					value={ minMax.min }
					maxLength={ 6 }
					onChange={ event => onChange('min', event.target.value) }
					className="w-full flex bg-transparent pl-4 text-[15px] text-gray-500 font-medium outline-0"
					placeholder={ `${ t('from', true) } ${ from }` }
				/>
			</div>
			<div
				className='flex h-10 rounded mx-auto bg-white p-0.5 mt-4 lg:mt-0 border border-gray-300 w-full lg:max-w-[600px]'>
				<input
					type="text"
					value={ minMax.max }
					maxLength={ 6 }
					onChange={ event => onChange('max', event.target.value) }
					className="w-full flex bg-transparent pl-4 text-[15px] text-gray-500 font-medium outline-0"
					placeholder={ `До ${ to }` }
				/>
			</div>
		</div>
		<button onClick={() => handleClick()} className='btn black max-w-full uppercase mt-4 mb-4'>
			{ btnTitle }
		</button>
	</div>
};
