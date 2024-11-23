import { FC } from 'react';

import { SimilarProducts } from "../../../containers/Product/SimilarProducts";
import { RecentlyViewed } from "../../../containers/Product/RecentlyViewed";
import { Bookmarks } from "../../../containers/Product/Bookmarks";

interface OthersProducts {
	id: string;
}

export const OthersProducts: FC<OthersProducts> = ({ id }) => {
	return <div className='container mx-auto'>
		<div className='lg:ml-72 lg:mr-10'>
			<SimilarProducts id={ id }/>
			<RecentlyViewed/>
			<Bookmarks/>
		</div>
	</div>
};
