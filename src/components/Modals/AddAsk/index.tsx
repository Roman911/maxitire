import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useAppSelector } from '../../../hooks';
import { Language } from '../../../models/language';
import { TextFile } from "../../Lib";

interface AddAskProps {
	name: string | undefined
	isSending: boolean
}

export const AddAsk: FC<AddAskProps> = ({ name, isSending }) => {
	const { control, formState: { errors } } = useFormContext();
	const { lang } = useAppSelector(state => state.langReducer);

	return <>
		<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
			<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
				<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase" id="modal-title">
					{lang === Language.UA ? 'Задати питання' : 'Задать вопрос'}
				</h3>
				<p className="text-sm mt-4 text-gray-500">
					{name}
				</p>
				{isSending ? <div className="mt-3">
					<p className="font-semibold text-gray-500">
						{lang === Language.UA ?
							'Ваше питання успішно надіслано' :
							'Ваш вопрос успешно отправлен'}
					</p>
				</div> : <div className="mt-3">
					<div className="relative mt-6 w-full min-w-[200px]">
						<Controller
							name="email"
							control={control}
							render={({field}) => {
								return <TextFile
									field={field}
									label={lang === Language.UA ? 'Електронна пошта' : 'Электронная почта'}
									error={typeof errors?.['email']?.message === 'string' ? errors['email'].message : null}
								/>
							}}
						/>
						<Controller
							name="ask"
							control={control}
							render={({field}) => <TextFile
								field={field}
								label={lang === Language.UA ? 'Ваш коментар' : 'Ваш комментарий'}
								error={typeof errors?.['ask']?.message === 'string' ? errors['ask'].message : null}
								isTextarea={true}
							/>}
						/>
					</div>
				</div>}
			</div>
		</div>
		<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
			<button type="submit" className='btn primary w-max px-5'>
				{ lang === Language.UA ? 'Надіслати' : 'Отправить' }
			</button>
		</div>
	</>
};
