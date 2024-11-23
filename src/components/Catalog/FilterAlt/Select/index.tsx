import { FC, useCallback, useState, MouseEvent, ChangeEvent, useRef } from 'react';
import classNames from 'classnames';

import './index.scss';
import { ChevronDownIcon } from '../../../Lib/Icons';
import { SearchInput } from './SearchInput';
import type { Options } from '../../../../models/baseData';

interface SelectProps {
	label: string
	name: string
	variant: 'white' | 'gray'
	search?: boolean
	options: Array<Options>
	focusValue: string | false
	onChange: (name: string, value: number | string | undefined | null, element: HTMLElement) => void
	filterValue?: null | number | string
	valueStudded?: null | number | string
	filterOther?: {
		only_c: string | null | undefined
		only_xl: string | null | undefined
		only_owl: string | null | undefined
		only_run_flat: string | null | undefined
		only_off_road: string | null | undefined
	}
}

export const Select: FC<SelectProps> = (
	{
		name,
		label,
		variant,
		search,
		options,
		onChange,
		focusValue,
		filterValue,
		valueStudded,
		filterOther
	}) => {
	const [ open, setOpen ] = useState( false );
	const [ eventSearch, setEventSearch ] = useState('');
	const ref = useRef<HTMLUListElement | null>(null);

	const handleClickOpen = useCallback(() => {
		setOpen(prev => !prev);

		if (focusValue && ref.current) {
			const cont = ref.current.querySelectorAll('li');
			const elIndex = Array.from(cont).findIndex(el => el.textContent === focusValue);

			if (elIndex !== -1) {
				setTimeout(() => {
					ref.current?.scroll(0, elIndex * 41);
				}, 15);
			}
		}
	}, [focusValue]);

	const handleClick = (event: MouseEvent<HTMLElement> | ChangeEvent<HTMLElement>, value: number | string | undefined, isStudded?: boolean) => {
		const newValue = filterValue === value ? null : value;
		const newValueStudded = valueStudded === value ? null : value;
		if(name === 'other') {
			if (typeof value === 'string' && (value === 'only_c' || value === 'only_xl' || value === 'only_owl' || value === 'only_run_flat' || value === 'only_off_road')) {
				const othersValue = filterOther?.[value] === '1' ? null : '1';
				onChange(value, othersValue, event.currentTarget);
			}
		} else {
			if(name === 'sezon') {
				onChange('only_studded', null, event.currentTarget);
			}
			onChange(isStudded ? 'only_studded' : name, isStudded ? newValueStudded : newValue, event.currentTarget);
		}
	}

	const handleChange = (value: string) => {
		setEventSearch(value.toLowerCase());
	}

	return <div className={classNames('relative mt-2 rounded-sm', { 'bg-white': variant === 'white', 'bg-[#F0F2F5]': variant === 'gray' })} >
		<button type="button"
						onClick={() => handleClickOpen()}
						className={classNames('relative w-full cursor-default py-3 pr-10 text-left focus:outline-none', {'font-bold pl-1.5': variant === 'white', 'pl-3.5': variant === 'gray'})}
						aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
      <span className="flex items-center">
        <span className="block truncate uppercase text-[13px] font-semibold text-gray-500">{ label }</span>
      </span>
			<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2.5">
        <ChevronDownIcon className={ classNames({ 'stroke-black': variant === 'white', 'stroke-gray-500': variant === 'gray' }) } />
      </span>
		</button>
		{ search && open && <SearchInput value={ eventSearch } handleChange={ handleChange } /> }
		<ul ref={ ref } className={
			classNames('relative item-list max-h-[480px] w-full overflow-auto pb-1 pt-1 text-base ring-black ring-opacity-5 focus:outline-none sm:text-sm',
				{ 'hidden': !open })}
				tabIndex={-1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
			{options?.filter(i => i.label.toString().toLowerCase().includes(eventSearch)).map(item => {
				return <li key={ item.value } className="relative cursor-default select-none py-1 pl-2.5 pr-9 text-gray-900" id="listbox-option-0" role="option">
					<div className="inline-flex items-center">
						<label
							className="relative flex cursor-pointer items-center rounded-full"
							htmlFor={`${ name }-${ item.value }`}
							data-ripple-dark="true"
						>
							<input
								onChange={(event) => handleClick(event, item.value)}
								checked={name === 'other' ? !!filterOther?.[item.value as keyof typeof filterOther] : filterValue === item.value}
								id={`${ name }-${ item.value }`}
								type="checkbox"
								className="peer relative h-7 w-7 bg-white appearance-none cursor-pointer rounded-sm border border-[#A9ACB2] transition-all checked:border-blue-500 checked:bg-blue-500 hover:border-blue-500"
							/>
							<div
								className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white peer-checked:opacity-100">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className="h-3.5 w-3.5 fill-white">
									<path
										d="M5.4447 8.55578L2.33276 5.44494L0.777344 7.00036L5.4447 11.6677L13.2218 3.88953L11.6675 2.33301L5.4447 8.55578Z"
									/>
								</svg>
							</div>
						</label>
						<label className="mt-px cursor-pointer select-none font-medium ml-2.5">
							{ item.label }
						</label>
					</div>
				</li>
			})}
			{name === 'sezon' && filterValue === '2' && <li
				onClick={(event) => handleClick(event, 1, true)}
				className="relative cursor-default select-none py-1 pl-2.5 pr-9 text-gray-900"
				id="listbox-option-0"
				role="option"
			>
				<div className="inline-flex items-center ml-8">
					<label
						className="relative flex cursor-pointer items-center rounded-full"
						htmlFor='studded'
						data-ripple-dark="true"
					>
						<input
							onChange={(event) => handleClick(event, '1', true)}
							checked={valueStudded == '1'}
							id='studded'
							type="checkbox"
							className="peer relative h-7 w-7 bg-white appearance-none cursor-pointer rounded-sm border border-[#A9ACB2] transition-all checked:border-blue-500 checked:bg-blue-500 hover:border-blue-500"
						/>
						<div
							className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white peer-checked:opacity-100">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className="h-3.5 w-3.5 fill-white">
								<path
									d="M5.4447 8.55578L2.33276 5.44494L0.777344 7.00036L5.4447 11.6677L13.2218 3.88953L11.6675 2.33301L5.4447 8.55578Z"
								/>
							</svg>
						</div>
					</label>
					<label className="mt-px cursor-pointer select-none font-medium ml-2.5">
						Шип
					</label>
				</div>
			</li>}
		</ul>
	</div>
};
