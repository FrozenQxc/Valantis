const Skeleton = () => {
	return (
		<div className='flex animate-pulse flex-col shadow-neon text-center text-white items-center p-3 justify-center w-full md:w-[400px] lg:w-[400px] hover:animate-pulse'>
			<span className='bg-gray-500 h-5 w-[90px] mb-2'></span>
			<span className='bg-gray-500 h-5 w-[120px] mb-2'></span>
			<span className='bg-gray-500 h-5 w-[222px] mb-2'></span>
			<div className='h-24 w-24 m-5 xl:w-24 xl:h-24 bg-gray-500 rounded-full'></div>
		</div>
	)
}

export default Skeleton
