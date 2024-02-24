import { useEffect, useState } from 'react'
import { ItemsType } from '../types/types'
import * as Api from './api/api'
import Cards from './components/Cards'

export default function App() {
	const [pages, setPages] = useState<string[]>()
	const [items, setItems] = useState<ItemsType[]>()

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
	return (
		<div className='body'>
			<header className='bg-[#111]'>
				<h1 className='text-yellow-300 text-[40px] px-[40px]'>
					Ювелирный магазин
				</h1>
			</header>
			<Cards items={items} />
		</div>
	)
}
