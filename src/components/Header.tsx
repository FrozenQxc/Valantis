import { ChangeEvent, useEffect, useState } from 'react'
import * as Api from '../api/api'

interface Props {
	setPages: (arg: string[]) => void
	setSelect: (arg: string) => void
}

const Header = ({ setPages, setSelect }: Props) => {
	const [price, setPrice] = useState(0)
	const [brand, setBrand] = useState<string[]>()

	// Обнулить значение
	const reset = async () => {
		try {
			setSelect('d')
			const data = await Api.getIds(50)
			setPages(data)
			setPrice(0)
		} catch (error) {
			console.log(error, 'произошла ошибка')
		}
	}

	// Отсортировать по цене
	const priceFound = async () => {
		try {
			const data = await Api.filterIds(price)
			setPages(data)
		} catch (error) {
			console.log(error, 'произошла ошибка')
		}
	}

	// Получить бренды
	const getBrands = async () => {
		try {
			const data = await Api.getBrands()
			setBrand(data)
		} catch (error) {
			console.log(error, 'произошла ошибка')
		}
	}

	useEffect(() => {
		getBrands()
	}, [])

	const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelect(e.target.value)
	}

	return (
		<header className='bg-[#111] flex flex-col justify-center items-center gap-5 px-5 pt-5'>
			<div className='flex gap-2 items-center'>
				<a href='https://github.com/FrozenQxc/Valantis' title='GitHub'>
					<img
						className='hover:bg-white rounded-[50%]'
						width='50'
						height='50'
						src='https://img.icons8.com/ios-filled/50/github.png'
						alt='github'
					/>
				</a>
				<h1 className='text-yellow-300 text-2xl md:text-4xl text-center'>
					Ювелирный магазин
				</h1>
			</div>
			<div>
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
			</div>
			<div className='flex gap-5'>
				<label className=' text-white text-lg'>Сортировка:</label>
				<select name='sort' onChange={handleSortChange}>
					<option value='d'>Сортировать </option>
					<option value='null'>Убрать бренд без название</option>
					{brand?.map((item, index) => (
						<option key={index} value={index}>
							{item}
						</option>
					))}
				</select>
			</div>
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
	)
}

export default Header
