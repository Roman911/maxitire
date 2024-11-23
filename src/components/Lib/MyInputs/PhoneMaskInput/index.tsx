import { FC, useRef } from 'react';
import { IMaskInput } from 'react-imask';
import { Controller, useFormContext } from 'react-hook-form';
import classNames from 'classnames';

interface PhoneMaskInputProps {
	isSupport?: boolean
}

export const PhoneMaskInput: FC<PhoneMaskInputProps> = ({ isSupport }) => {
	const ref = useRef(null);
	const inputRef = useRef(null);
	const { control, formState: { errors } } = useFormContext();

	return <Controller
		name="telephone"
		control={control}
		render={({field}) => {
			return <>
				<div className={classNames('relative', { 'h-12 w-60 md:w-80 mt-2': isSupport, 'min-w-[200px] h-14 mt-3 w-full': !isSupport })}>
					<IMaskInput
						className={classNames(
							'peer h-full w-full rounded-md border px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50',
							{ 'border-gray-300': isSupport, 'border-blue-gray-200 bg-transparent': !isSupport }
						)}
						mask={'{+38}(000)000-00-00'}
						lazy={ false }
						radix=""
						value={ field.value }
						unmask={true}
						ref={ref}
						inputRef={inputRef}
						onAccept={
							(value) => field.onChange(value)
						}
						placeholder=''
					/>
					<label
						className={classNames(
							'before:content[\' \'] after:content[\' \'] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[5.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500',
							{ 'hidden': isSupport }
						)}>
						Номер телефону
					</label>
				</div>
				<p className='ml-2 h-2 text-xs text-red-500'>
					{ typeof errors?.['telephone']?.message === 'string' ? errors['telephone'].message : null }
				</p>
			</>
		}}
	/>
};
