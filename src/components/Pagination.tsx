import { ChangeEvent, FC } from 'react'

type IPagination = {
	totalPosts?: number
	postsPerPage: number
	setCurrentPage: (arg: number) => void
	setPostsPerPage: (arg: number) => void
}

const Pagination: FC<IPagination> = ({
	totalPosts,
	postsPerPage,
	setCurrentPage,
	setPostsPerPage,
}) => {
	let pages = []
	for (let i = 1; i <= Math.ceil((totalPosts || 1) / postsPerPage); i++) {
		pages.push(i)
	}

	const handlePerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const newPostsPerPage = parseInt(e.target.value)
		setPostsPerPage(newPostsPerPage)
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
			<div className='flex items-center gap-5'>
				<label className='text-white'>Items per page:</label>
				<select name='itemsPerPage' onChange={handlePerPageChange}>
					<option value='6'>6</option>
					<option value='9'>9</option>
					<option value='10'>10</option>
					<option value='50'>50</option>
				</select>
			</div>
		</div>
	)
}

export default Pagination
