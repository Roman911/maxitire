import { FC } from 'react';

import { ProductCard } from './ProductCard';
import type { Data } from '../../models/products';

interface ProductListProps {
	classnames?: string
	data: Data | undefined
}

export const ProductList: FC<ProductListProps> = ({ classnames = 'grid-cols-3', data }) => {
	const products = data?.products.map(item => {
		return <ProductCard key={ item.group } item={ item } />
	})

	return (
		<div className={`grid gap-8 ${classnames}`}>
			{products}
		</div>
	)
};
