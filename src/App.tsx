import { useEffect, useState } from 'react'
import { ItemsType } from '../types/types'
import * as Api from './api/api'
import Cards from './components/Cards'
import Header from './components/Header'
import Pagination from './components/Pagination'

export default function App() {
	const [pages, setPages] = useState<string[]>()
	const [loading, setLoading] = useState<boolean>(false)
	const [items, setItems] = useState<ItemsType[]>()
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage, setPostsPerPage] = useState<number>(9)
	const [select, setSelect] = useState<string>('')

	console.log(select === 'd')

	// Получить список идентификаторов товаров
	const getData = async () => {
		setLoading(true)
		try {
			const data = await Api.getIds(50)
			setPages(data)
			setLoading(false)
		} catch (error) {
			console.log(error, 'произошла ошибка')
		}
	}

	// Получить список товаров со всеми характеристиками
	const getItems = async (ids: string[]) => {
		setLoading(true)
		try {
			const data: ItemsType[] = await Api.getItems(ids)
			setItems(data)
			setLoading(false)
		} catch (error) {
			console.log(error, 'произошла ошибка')
		}
	}

	const filteredItems = items?.filter(item => item.brand !== null)

	console.log(filteredItems)

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		if (pages) {
			getItems(pages)
		}
	}, [pages])

	const lastPostIndex = currentPage * postsPerPage
	const firstPostIndex = lastPostIndex - postsPerPage
	const currentPosts =
		select === 'null'
			? filteredItems?.slice(firstPostIndex, lastPostIndex)
			: items?.slice(firstPostIndex, lastPostIndex)

	return (
		<div className='bg-[#111] flex flex-col min-h-screen'>
			<Header setPages={setPages} setSelect={setSelect} />
			<Cards items={currentPosts} loading={loading} />
			<Pagination
				currentPage={currentPage}
				setPostsPerPage={setPostsPerPage}
				totalPosts={items?.length}
				postsPerPage={postsPerPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	)
}
