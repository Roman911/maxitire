import { FC, useRef } from 'react';
import ImageGallery from 'react-image-gallery';
import './index.scss';

interface ImageGalleryProps {
	images: Array<{
		original: string
		thumbnail: string
	}>
}

export const ImgGallery: FC<ImageGalleryProps> = ({ images }) => {
	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	const imageGalleryRef = useRef<any>(null);

	const onClickHandler = () => {
		imageGalleryRef.current?.toggleFullScreen();
	};

	return <ImageGallery
		items={ images }
		showPlayButton={ false }
		ref={ imageGalleryRef }
		onClick={ onClickHandler }
		showThumbnails={ images.length > 1 }
	/>
};
