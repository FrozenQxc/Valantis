import { FC } from 'react'

type IPagination = {
	totalPosts?: number
	postsPerPage: number
	setCurrentPage: (arg: number) => void
}

const Pagination: FC<IPagination> = ({
	totalPosts,
	postsPerPage,
	setCurrentPage,
}) => {
	let pages = []
	for (let i = 1; i <= Math.ceil(totalPosts! / postsPerPage); i++) {
		pages.push(i)
	}
	return (
		<div className='flex flex-wrap justify-center gap-5 p-5 mx-auto md:max-w-4xl lg:max-w-6xl xl:max-w-7xl'>
			{pages.map((page, index) => {
				return (
					<button
						className='border p-3 text-white  hover:text-teal-200    '
						key={index}
						onClick={() => setCurrentPage(page)}
					>
						{page}
					</button>
				)
			})}
		</div>
	)
}

export default Pagination
