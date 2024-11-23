import { useAppTranslation } from '../../../hooks';
import { Link } from '../../../lib';

export const ShowAll = () => {
	const t = useAppTranslation();

	return <Link to='/catalog/tires' className='btn white mt-10 mx-auto' >
		{ t('show all', true) }
	</Link>
};
