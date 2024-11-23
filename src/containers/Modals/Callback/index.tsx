import { FC, useState } from 'react';
import * as yup from "yup";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { baseDataAPI } from '../../../services/baseDataService';
import { CallbackComponent } from '../../../components/Modals';

const schema = yup.object().shape({
	telephone: yup.string().min(13, 'Це поле обовʼязкове.').max(13).required('Це поле обовʼязкове.'),
});

interface FormProps {
	telephone: string
}

const defaultValues = {
	telephone: '',
}

interface CallbackProps {
	productId: number | undefined
	quantity: number
}

export const Callback: FC<CallbackProps> = ({ productId, quantity }) => {
	const [isSending, setSending] = useState(false);
	const [createCallback] = baseDataAPI.useCreateCallbackMutation();

	const methods = useForm<FormProps>({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(schema),
	})

	const onSubmit: SubmitHandler<FormProps> = async ({ telephone }) => {
		await createCallback({
			phone: telephone,
			product_id: productId?.toString(),
			quantity: quantity,
		}).then((response: { data?: { result: boolean }; error?: FetchBaseQueryError | SerializedError }) => {
			if(response?.data?.result) {
				methods.reset();
				setSending(true);
			} else if(response.error) {
				console.error('An error occurred:', response.error);
			}
		});
	}

	return <FormProvider {...methods}>
		<form onSubmit={methods.handleSubmit(onSubmit)}>
			<CallbackComponent isSending={ isSending } />
		</form>
	</FormProvider>
};
