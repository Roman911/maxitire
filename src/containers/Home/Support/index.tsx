import * as yup from "yup";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { baseDataAPI } from '../../../services/baseDataService.ts'
import { SupportComponent } from '../../../components/Home';
import { useAppSelector } from '../../../hooks';
import { Language } from '../../../models/language.ts';

const schema = yup.object().shape({
	comment: yup.string().required('Це поле обовʼязкове.'),
	telephone: yup.string().min(13, 'Це поле обовʼязкове.').max(13).required('Це поле обовʼязкове.'),
});

interface FormProps {
	comment: string
	telephone: string
}

const defaultValues = {
	comment: '',
	telephone: '',
}

export const Support = () => {
	const [createCallback] = baseDataAPI.useCreateCallbackMutation();
	const { lang } = useAppSelector(state => state.langReducer);
	const notifySuccess = () => toast.success(lang === Language.UA ? 'Повідомлення відправлено' : 'Сообщение отправлено');
	const notifyError = () => toast.error("Wow so easy!");

	const methods = useForm<FormProps>({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(schema),
	})

	const onSubmit: SubmitHandler<FormProps> = async ({ telephone }) => {
		notifySuccess();
		await createCallback({
			phone: telephone,
			product_id: '1',
			quantity: '1',
		}).then((response: { data?: { result: boolean }; error?: FetchBaseQueryError | SerializedError }) => {
			if(response?.data?.result) {
				methods.reset();
				notifySuccess();
			} else if(response.error) {
				notifyError();
				console.error('An error occurred:', response.error);
			}
		});
	}

	return <FormProvider {...methods}>
		<form onSubmit={methods.handleSubmit(onSubmit)}>
			<SupportComponent />
		</form>
	</FormProvider>
};
