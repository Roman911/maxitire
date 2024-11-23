import { useAppTranslation } from '../../../hooks';
import { Link } from '../../../lib';

import img01 from '../../../assets/top_brands/01.png';
import img02 from '../../../assets/top_brands/02.png';
import img03 from '../../../assets/top_brands/03.png';
import img04 from '../../../assets/top_brands/04.png';
import img05 from '../../../assets/top_brands/05.png';
import img06 from '../../../assets/top_brands/06.png';
import img07 from '../../../assets/top_brands/07.png';
import img08 from '../../../assets/top_brands/08.png';

export const TopBrands = () => {
	const t = useAppTranslation();
	const images = [
		{img: img01, link: '29'},
		{img: img02, link: '36'},
		{img: img03, link: '153'},
		{img: img04, link: '102'},
		{img: img05, link: '87'},
		{img: img06, link: '48'},
		{img: img07, link: '177'},
		{img: img08, link: '232'}
	];

	return (
		<div className='mt-24'>
			<div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 justify-items-center'>
				{images.map((item, index) => (
					<Link to={`/catalog/tires/b-${item.link}`} key={index} className=''>
						<img src={ item.img } alt='' />
					</Link>
				))}
			</div>
			<Link to='/catalog/tires' className='btn white mt-10 mx-auto'>
				{t('show all', true)}
			</Link>
		</div>
	);
};
