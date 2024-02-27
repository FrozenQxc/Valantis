import { ChangeEvent, useEffect, useState } from 'react'
import * as Api from '../api/api'

interface Props {
	setPages: (arg: string[]) => void
	setSearchValue: (arg: string) => void
	setSelectBrand: (arg: string) => void
	setBrand: (arg: string[]) => void
	brand: string[] | undefined
	searchValue: string | undefined
}

const Header = ({
	setPages,
	setSearchValue,
	setSelectBrand,
	setBrand,
	brand,
	searchValue,
}: Props) => {
	const [price, setPrice] = useState(0)

	// Обнулить значение
	const reset = async () => {
		try {
			setPrice(0)
			setSearchValue('')
			setSelectBrand('d')
			const data = await Api.getIds(50)
			setPages(data)
		} catch (error) {
			console.log(error, 'произошла ошибка')
		}
	}

	// Отсортировать по цене
	const onSubmit = async () => {
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

	// Отсортировать по бренду
	const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedIndex = e.target.value
		if (selectedIndex === 'd') {
			setSelectBrand('d')
		} else if (selectedIndex === 'null') {
			setSelectBrand('null')
		} else {
			const selectedBrand = brand ? brand[parseInt(selectedIndex)] : ''
			setSelectBrand(selectedBrand)
		}
	}

	useEffect(() => {
		getBrands()
	}, [])

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
			<div className='flex flex-col items-center gap-5 md:flex-row  '>
				<label className='text-white text-lg '>Поиск</label>
				<input
					type='text'
					autoFocus
					value={searchValue}
					placeholder='Введите текст'
					onChange={e => setSearchValue(e.target.value)}
					className='w-[300px] p-2 bg-white'
				/>
				<label className=' text-white text-lg '>Сортировка:</label>
				<select name='sort' className=' p-2' onChange={handleSortChange}>
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
					onClick={onSubmit}
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
