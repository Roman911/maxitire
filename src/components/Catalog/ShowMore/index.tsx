export const ShowMore = ({ title, onClickShowMore }: { title: string, onClickShowMore: () => void }) => {
	return <button className='btn white mt-10 w-full hover:bg-[#E9EBF0] hover:border-[#E9EBF0]' onClick={() => onClickShowMore()}>
		{ title }
	</button>
};
