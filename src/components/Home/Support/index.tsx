import { Controller, useFormContext } from 'react-hook-form';

import styles from './index.module.scss';
import { useAppSelector } from '../../../hooks';
import { PhoneMaskInput, TextFile } from '../../Lib';
import { Language } from '../../../models/language.ts';

export const SupportComponent = () => {
	const { control, formState: { errors } } = useFormContext();
	const { lang } = useAppSelector(state => state.langReducer);

	return <div className={ styles.support }>
		<div className='py-10 flex justify-center flex-col text-white'>
			<h3 className='text-4xl font-bold uppercase'>
				{ lang === 'ua' ? 'Звʼязок з менеджером' : 'Звонок с менеджером' }
			</h3>
			<div className='mt-8'>
				<Controller
					name="comment"
					control={ control }
					render={ ({ field }) => {
						return <TextFile
							field={ field }
							label={ lang === Language.UA ? 'Яка інформація Вас цікавить?' : 'Какая информация Вас интересует?' }
							error={ typeof errors?.['comment']?.message === 'string' ? errors['comment'].message : null }
						/>
					} }
				/>
				<div>
					<PhoneMaskInput isSupport={ true }/>
				</div>
				<button type='submit' className='btn primary -ml-2 relative'>
					{ lang === 'ua' ? 'Замовити дзвінок' : 'Заказать звонок' }
				</button>
			</div>
		</div>
	</div>
};
