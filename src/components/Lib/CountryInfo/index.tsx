import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface CountryInfoProps {
	country: string
	year: number
	mobileHidden?: boolean
}

export const CountryInfo: FC<CountryInfoProps> = ({ country, year, mobileHidden }) => {
	return <p className='text-sm'>
			<span className={twMerge(mobileHidden && 'hidden sm:inline')}>
				{country}{country && year > 0 && ', '}
			</span>{year > 0 && year}
	</p>
};
