import { FC } from 'react';

interface ImageLayoutProps {
	src: string
	alt: string
	height: number
	width: number
}

export const ImgLayout: FC<ImageLayoutProps> = ({ src, alt, height, width }) => {
	return (
		<picture>
			<img src={ src } alt={ alt } height={ height } width={ width } />
		</picture>
	)
};
