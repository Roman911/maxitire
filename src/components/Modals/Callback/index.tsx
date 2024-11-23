import { FC } from 'react';

import { useAppSelector } from '../../../hooks';
import { Language } from '../../../models/language';
import { PhoneMaskInput } from '../../Lib';

interface CallbackProps {
	isSending: boolean;
}

export const CallbackComponent: FC<CallbackProps> = ({ isSending }) => {
	const { lang } = useAppSelector(state => state.langReducer);

	return <>
		<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
			<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
				<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase" id="modal-title">
					{ lang === Language.UA ? 'Зворотній дзвінок' : 'Обратный звонок' }
				</h3>
				{isSending ? <div className="mt-3">
					<p className="text-sm text-gray-500">
						{lang === Language.UA ?
							'Наш менеджер зателефонує Вам' :
							'Наш менеджер позвонит Вам'}
					</p>
				</div> : <div className="mt-3">
					<p className="text-sm text-gray-500">
						{lang === Language.UA ?
							'Залиште телефон і менеджер з Вами зв\'яжеться' :
							'Оставьте телефон и менеджер с Вами свяжется'}
					</p>
					<div className="relative mt-6 h-11 w-full min-w-[200px]">
						<PhoneMaskInput />
					</div>
				</div>}
			</div>
		</div>
		<div className="bg-gray-50 mt-3 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
			<button type="submit" className='btn primary w-max px-5'>
				{ lang === Language.UA ? 'Надіслати' : 'Отправить' }
			</button>
		</div>
	</>
};
