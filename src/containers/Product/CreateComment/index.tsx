import { FC, useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { baseDataAPI } from '../../../services/baseDataService';
import { useAppSelector } from '../../../hooks';
import { CreateCommentComponent } from '../../../components/Product/CreateComment';

const schema = yup.object().shape({
	text: yup.string().required('Поле не може бути пустим'),
	name: yup.string().required('Поле не може бути пустим'),
	score: yup.number(),
});

interface FormProps {
	text: string
	name: string
	score?: number
}

const defaultValues = {
	text: '',
	name: '',
	score: 0,
}

interface CreateCommentProps {
	model_id?: number
	product_id?: number
	trc_id?: number
}

export const CreateComment: FC<CreateCommentProps> = ({ model_id, product_id, trc_id }) => {
	const [rate, setRate] = useState<number>(0);
	const { lang } = useAppSelector(state => state.langReducer);
	const [createComment] = baseDataAPI.useCreateCommentMutation();

	const methods = useForm<FormProps>({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(schema),
	})

	const onSubmit: SubmitHandler<FormProps> = async (data) => {
		const { text, name } = data;

		await createComment({
			text,
			name,
			score: rate,
			model_id,
			product_id,
			trc_id,
		}).then(data => {
			if(data) {
				methods.reset();
			}
		})
	}

	return <FormProvider {...methods}>
		<form onSubmit={ methods.handleSubmit(onSubmit) }>
			<CreateCommentComponent lang={lang} rate={ rate } setRate={ setRate } />
		</form>
	</FormProvider>
};
