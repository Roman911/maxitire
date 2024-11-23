import { FC, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import './index.scss';

interface PaginateProps {
	itemsPerPage: number
	paginateCount: number
	total_count: number | undefined
	handlePageClick: (event: { selected: number; }) => void
}

export const Paginate: FC<PaginateProps> = ({ itemsPerPage, total_count = 0, handlePageClick }) => {
	const [ pageRangeDisplayed, setPageRangeDisplayed ] = useState(3);

	useEffect(() => {
		if(window.innerWidth < 768) {
			setPageRangeDisplayed(5);
		}
	}, [])
	const pageCount = Math.ceil(total_count / itemsPerPage);

	return <ReactPaginate
		className='paginate'
		breakLabel='...'
		nextLabel='>'
		onPageChange={ handlePageClick }
		pageRangeDisplayed={ pageRangeDisplayed }
		marginPagesDisplayed={ 2 }
		pageCount={ pageCount }
		previousLabel='<'
		renderOnZeroPageCount={ null }
	/>
};
