import * as yup from "yup";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { baseDataAPI } from '../../../services/baseDataService';
import { SupportComponent } from '../../../components/Layout/Support';

const schema = yup.object().shape({
	telephone: yup.string().min(13, 'Це поле обовʼязкове.').max(13).required('Це поле обовʼязкове.'),
});

interface FormProps {
	telephone: string
}

const defaultValues = {
	telephone: '',
}

export const Support = () => {
	const [createCallback] = baseDataAPI.useCreateCallbackMutation();

	const methods = useForm<FormProps>({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(schema),
	})

	const onSubmit: SubmitHandler<FormProps> = async ({ telephone }) => {
		await createCallback({
			phone: telephone,
			product_id: '1',
			quantity: '1',
		}).then((response: { data?: { result: boolean }; error?: FetchBaseQueryError | SerializedError }) => {
			if(response?.data?.result) {
				methods.reset();
			} else if(response.error) {
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
