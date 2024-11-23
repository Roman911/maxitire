import { FC, ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode
}

export const LayoutWrapper: FC<LayoutProps> = ({ children }) => {
	return <div className='container max-w-6xl mx-auto px-4 py-5 min-h-[70vh]'>
		{ children }
	</div>
}
