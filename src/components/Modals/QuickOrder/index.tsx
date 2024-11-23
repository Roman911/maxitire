import { FC } from 'react';

import { useAppSelector } from '../../../hooks';
import { Language } from '../../../models/language';
import { PhoneMaskInput, Spinner } from '../../Lib';

interface QuickOrderProps {
	loading: boolean
}

export const QuickOrderComponent: FC<QuickOrderProps> = ({ loading }) => {
	const { lang } = useAppSelector(state => state.langReducer);

	return <>
		<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
			<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
				<h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{ lang === Language.UA ? 'ШВИДКЕ ЗАМОВЛЕННЯ' : 'БЫСТРЫЙ ЗАКАЗ' }</h3>
				<div className="mt-3">
					<p className="text-sm text-gray-500">
						{ lang === Language.UA ?
							'Економте Ваш час, просто залиште телефон і менеджер з Вами зв\'яжеться для уточнення всіх деталей' :
							'Экономьте Ваше время, просто оставьте телефон и менеджер с Вами свяжется для уточнения всех деталей' }
					</p>
					<div className="relative mt-6 h-11 w-full min-w-[200px]">
						<PhoneMaskInput />
					</div>
				</div>
			</div>
		</div>
		<div className="bg-gray-50 mt-3 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
			<button type="submit" className='btn primary w-max px-5 min-w-32' disabled={ loading }>
				<Spinner size='small' height='h-10' show={ loading } >
					{ lang === Language.UA ? 'Надіслати' : 'Отправить' }
				</Spinner>
			</button>
		</div>
	</>
};
