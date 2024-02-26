import { useEffect, useState } from 'react'
import { ItemsType } from '../types/types'
import * as Api from './api/api'
import Cards from './components/Cards'
import Header from './components/Header'
import Pagination from './components/Pagination'

export default function App() {
	const [pages, setPages] = useState<string[]>()
	const [loading, setLoading] = useState<boolean>(false)
	const [items, setItems] = useState<ItemsType[] | undefined>()
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage, setPostsPerPage] = useState<number>(9)
	const [selectBrand, setSelectBrand] = useState<string>('')
	const [brand, setBrand] = useState<string[]>()
	const [searchValue, setSearchValue] = useState<string>('')

	const lastPostIndex = currentPage * postsPerPage
	const firstPostIndex = lastPostIndex - postsPerPage

	const itemsSlice = items
		?.filter(item => {
			return searchValue.toLowerCase() === ''
				? item
				: item.product.toLowerCase().includes(searchValue)
		})
		.slice(firstPostIndex, lastPostIndex)

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
	const filteredByBrand = items?.filter(item => item.brand === selectBrand)

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		filterBrand()
		setCurrentPage(1)
	}, [selectBrand])

	useEffect(() => {
		if (pages) {
			getItems(pages)
		}
	}, [pages])

	const filterBrand = () => {
		if (selectBrand === 'null') {
			setItems(filteredItems)
		} else if (selectBrand === 'd') {
			if (pages) {
				getItems(pages)
			}
		} else {
			setItems(filteredByBrand)
		}
	}

	return (
		<div className='bg-[#111] flex flex-col min-h-screen'>
			<Header
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				setPages={setPages}
				setSelectBrand={setSelectBrand}
				brand={brand}
				setBrand={setBrand}
			/>
			<Cards items={itemsSlice} loading={loading} />
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
