import { FC } from 'react';

import { InfoIcon } from '../Icons';

interface TooltipProps {
	label: string;
}

export const TooltipWithIcon: FC<TooltipProps> = ({ label }) => {
	return <span className="group relative">
    <div className="absolute z-30 bottom-[calc(100%+0.5rem)] -left-2 xl:left-[50%] xl:-translate-x-[50%] hidden group-hover:block w-auto">
      <div className="bottom-full right-0 rounded bg-black px-4 py-1 text-xs text-white w-52 text-center">
        { label }
        <svg className="absolute left-0 top-full h-2 w-8 xl:w-full text-black" x="0px" y="0px" viewBox="0 0 255 255">
					<polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
				</svg>
      </div>
    </div>
    <InfoIcon className='fill-[#7D92B2] mb-0.5'/>
  </span>
};
