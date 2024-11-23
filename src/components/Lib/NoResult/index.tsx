import { FC } from 'react';

interface NoResultProps {
	noResultText: string
}

export const NoResult: FC<NoResultProps> = ({ noResultText }) => {
	return (
		<div className="py-5 px-5 text-center bg-blue-100 w-full mt-4 text-lg font-medium">
			{ noResultText }
		</div>
	)
};
