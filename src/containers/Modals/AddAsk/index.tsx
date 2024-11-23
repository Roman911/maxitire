import { FC, useState } from 'react';
import * as yup from "yup";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { baseDataAPI } from '../../../services/baseDataService';
import { AddAsk } from "../../../components/Modals";

const schema = yup.object().shape({
	ask: yup.string().min(10).required('Це поле обовʼязкове.'),
	email: yup.string().email().required('Це поле обовʼязкове.'),
});

interface FormProps {
	ask: string
	email: string
}

const defaultValues = {
	ask: '',
	email: '',
}

interface AddAskModalProps {
	name: string | undefined
	productId: number | undefined
}

export const AddAskModal: FC<AddAskModalProps> = ({ name, productId }) => {
	const [isSending, setSending] = useState(false);
	const [createAddAsk] = baseDataAPI.useCreateAddAskMutation();

	const methods = useForm<FormProps>({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<FormProps> = async ({ ask, email }) => {
		await createAddAsk({
			ask,
			email,
			product_id: productId,
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
			<AddAsk isSending={ isSending } name={ name } />
		</form>
	</FormProvider>
};
