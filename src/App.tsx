import { useEffect, useState } from 'react'
import { ItemsType } from '../types/types'
import * as Api from './api/api'
import Cards from './components/Cards'
import Pagination from './components/Pagination'

export default function App() {
	const [pages, setPages] = useState<string[]>()
	const [loading, setLoading] = useState<boolean>(false)
	const [price, setPrice] = useState(0)
	const [items, setItems] = useState<ItemsType[]>()
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage, setPostsPerPage] = useState<number>(9)

	const fetchData = async () => {
		setLoading(true)
		try {
			const data = await Api.getIds(50)
			setPages(data)
			setLoading(false)
		} catch (error) {
			console.log(error, 'произошла ошибка')
		}
	}

	const fetchItems = async (ids: string[]) => {
		setLoading(true)
		try {
			const data: ItemsType[] = await Api.getItems(ids)
			setItems(data)
			setLoading(false)
		} catch (error) {
			console.log(error, 'произошла ошибка')
		}
	}

	const priceFound = async () => {
		setLoading(true)
		try {
			const data = await Api.filterIds(price)
			setPages(data)
			setLoading(false)
		} catch (error) {
			console.log(error, 'произошла ошибка')
		}
	}

	const reset = async () => {
		try {
			const data = await Api.getIds(50)
			setPages(data)
			setPrice(0)
		} catch (error) {
			console.log(error, 'произошла ошибка')
		}
	}

	useEffect(() => {
		fetchData()
		priceFound()
	}, [])

	useEffect(() => {
		if (pages) {
			fetchItems(pages)
		}
	}, [pages])

	const lastPostIndex = currentPage * postsPerPage
	const firstPostIndex = lastPostIndex - postsPerPage
	const currentPosts = items?.slice(firstPostIndex, lastPostIndex)

	return (
		<body className='bg-[#111]'>
			<div className='flex flex-col min-h-screen'>
				<header className='bg-[#111] flex flex-col justify-center items-center gap-5 px-5'>
					<h1 className='text-yellow-300 text-2xl md:text-4xl text-center'>
						Ювелирный магазин
					</h1>
					<h2 className='text-white text-lg'>Цена: {price}</h2>
					<input
						className='w-full md:w-[350px] bg-gray-800 text-white rounded-md  py-2'
						value={price}
						type='range'
						min='0'
						max='10000'
						step='100'
						onChange={e => setPrice(parseInt(e.target.value))}
					/>
					<div className='flex flex-col md:flex-row gap-3'>
						<button
							onClick={priceFound}
							className='w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300'
						>
							Применить
						</button>
						<button
							onClick={reset}
							className='w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-300'
						>
							Сбросить
						</button>
					</div>
				</header>
				<Cards items={currentPosts} loading={loading} />
				<Pagination
					setPostsPerPage={setPostsPerPage}
					totalPosts={items?.length}
					postsPerPage={postsPerPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</body>
	)
}
