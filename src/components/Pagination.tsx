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
		<div className=' my-10 text-white gap-2 items-center text-center flex justify-center '>
			{pages.map((page, index) => {
				return (
					<button
						className='border p-3  hover:text-teal-200    '
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
