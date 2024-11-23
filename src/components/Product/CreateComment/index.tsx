import { Dispatch, FC, SetStateAction } from 'react';
import { Controller, useFormContext } from 'react-hook-form'

import { Rating, TextFile } from '../../Lib';
import { Language } from '../../../models/language';

interface CreateCommentProps {
	lang: Language
	rate: number
	setRate: Dispatch<SetStateAction<number>>
}

export const CreateCommentComponent: FC<CreateCommentProps> = ({ lang, rate, setRate }) => {
	const { control, formState: { errors } } = useFormContext();

	return <div className='bg-white  shadow-md mt-6'>
		<h6 className='font-bold text-lg py-4 px-6 bg-blue-100'>
			{lang === Language.UA ? 'Залишити відгук' : 'Оставить отзыв'}
		</h6>
		<div className='pt-4 px-6 pb-6'>
			<Controller
				name="name"
				control={control}
				render={({ field }) => <TextFile field={ field } label={ lang === Language.UA ? 'Ім\'я*' : 'Имя*' } error={ typeof errors?.['name']?.message === 'string' ? errors['name'].message : null } /> }
			/>
			<Controller
				name="text"
				control={control}
				render={({field}) => <TextFile field={ field } label={ lang === Language.UA ? 'Коментар*' : 'Комментарий*' } error={ typeof errors?.['text']?.message === 'string' ? errors['text'].message : null } isTextarea={ true } /> }
			/>
			<div className='mt-3 mb-6 flex items-center'>
				<span className='mr-2 ml-2 text-sm font-semibold'>
					{lang === Language.UA ? 'Оцінка' : 'Оценка'}
				</span>
				<Rating commentsAvgRate={rate} size='medium' isCreateComment={true} setRate={setRate}/>
			</div>
			<button type="submit" className='btn primary'>
				{lang === Language.UA ? 'Додати відгук' : 'Добавить отзыв'}
			</button>
		</div>
	</div>
};
