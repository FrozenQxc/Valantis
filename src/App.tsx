import { useEffect, useState } from 'react'
import { ItemsType } from '../types/types'
import * as Api from './api/api'
import Cards from './components/Cards'
import Pagination from './components/Pagination'

export default function App() {
	const [pages, setPages] = useState<string[]>()
	const [items, setItems] = useState<ItemsType[]>()
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage] = useState<number>(9)

	const fetchData = async () => {
		try {
			const data = await Api.getIds()
			setPages(data)
		} catch (error) {
			console.log(error, 'произошла ошибка')
		}
	}

	const fetchItems = async (ids: string[]) => {
		try {
			const data: ItemsType[] = await Api.getItems(ids)
			setItems(data)
		} catch (error) {
			console.log(error, 'произошла ошибка')
		}
	}

	useEffect(() => {
		fetchData()
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
		<div className='body flex flex-col justify-between p'>
			<header className='bg-[#111]'>
				<h1 className='flex justify-center text-yellow-300 text-[40px] px-[40px]'>
					Ювелирный магазин
				</h1>
			</header>
			<Cards items={currentPosts} />
			<Pagination
				totalPosts={items?.length}
				postsPerPage={postsPerPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	)
}
