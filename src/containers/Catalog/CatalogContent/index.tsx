import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { config } from '../../../config';
import { baseDataAPI } from '../../../services/baseDataService';
import { useAppGetProductsForCatalog, useAppSelector } from '../../../hooks';
import { ProductList } from '../../ProductList';
import { Paginate, ShowMore } from '../../../components/Catalog';
import { Language } from '../../../models/language';
import { NoResult, Spinner } from '../../../components/Lib';

export const CatalogContent = () => {
	const [ paginateCount, setPaginateCount ] = useState(0);
	const [ getParams, setGetParams ] = useState('');
	const [ moreCount, setMoreCount ] = useState(1);
	const [ itemsProduct, setItemsProduct ] = useState(config.catalog.itemsProduct);
	const { lang } = useAppSelector(state => state.langReducer);
	const params = useAppGetProductsForCatalog();
	const { data, isLoading } = baseDataAPI.useFetchProductsQuery(
		{ id: `?${ getParams }`, length: itemsProduct, start: paginateCount * config.catalog.itemsProduct }
	);
	const targetRef = useRef<HTMLDivElement>(null);
	const paramsUrl = useParams();

	useEffect(() => {
		setGetParams(params);
	}, [ params, paramsUrl ]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handlePageClick = (event: { selected: number; }) => {
		targetRef.current?.scrollIntoView({ behavior: 'smooth' });
		const container = document.querySelector('.paginate');
		const elements = container?.querySelectorAll('li') || [];
		for(let i = 0; i < elements.length; i++) {
			elements[i].classList.remove('selected');
		}
		setMoreCount(1);
		setPaginateCount(event.selected);
		setItemsProduct(config.catalog.itemsProduct);
	};

	const onClickShowMore = () => {
		setMoreCount(prev => prev + 1);
		setItemsProduct(prevState => prevState + config.catalog.itemsProduct);

		const container = document.querySelector('.paginate');
		const elements = container?.querySelectorAll('li') || [];

		for(let i = 0; i < moreCount; i++) {
			const element =
				Array.from(elements).find(el => el.textContent === `${ paginateCount + i + 2 }`);
			element?.classList.add('selected');
		}
	}

	return (
		<div className='flex-1'>
			<div ref={ targetRef }></div>
			<Spinner height='h-60' show={ isLoading } size='large'>
				{ data?.result ? <ProductList
					classnames='grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
					data={ data?.data }
				/> : <NoResult
					noResultText={ lang === Language.UA ?
						'На жаль, по заданих параметрах товарів не знайдено' :
						'К сожалению, по заданным параметрам товаров не найдено'
					}
				/> }
			</Spinner>
			{ data?.result && paginateCount * config.catalog.itemsProduct + itemsProduct < data.data.total_count &&
				<ShowMore onClickShowMore={ onClickShowMore }
									title={ lang === Language.UA ? 'Показати більше' : 'Показать больше' }/> }
			{ data?.result && data.data.total_count > 12 &&
				<Paginate
					itemsPerPage={ config.catalog.itemsProduct }
					paginateCount={ paginateCount }
					total_count={ data?.data.total_count }
					handlePageClick={ handlePageClick }
				/> }
		</div>
	)
};
