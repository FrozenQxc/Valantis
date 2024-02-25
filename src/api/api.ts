import md5 from 'crypto-js/md5'
import { ItemsType } from '../../types/types'

const password = 'Valantis'
const BASE_URL = 'https://api.valantis.store:41000/'
const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '')
const authString = md5(`${password}_${timestamp}`).toString()

// список идентификаторов товаров
export const getIds = async (limit: number): Promise<string[]> => {
	const offset = 1
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth': authString,
		},
		body: JSON.stringify({
			action: 'get_ids',
			params: { offset, limit },
		}),
	}

	try {
		const response = await fetch(BASE_URL, requestOptions)
		if (!response.ok) {
			throw new Error('Ошибка запроса')
		}
		const data = await response.json()

		// Убираем дубликаты
		const uniqueIds: string[] = []
		for (const id of data.result) {
			if (!uniqueIds.includes(id)) {
				uniqueIds.push(id)
			}
		}
		return uniqueIds
	} catch (error) {
		console.error('Ошибка:', error)
		return []
	}
}

//  список товаров со всеми характеристиками
export const getItems = async (ids: string[]): Promise<ItemsType[]> => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth': authString,
		},
		body: JSON.stringify({
			action: 'get_items',
			params: { ids },
		}),
	}

	try {
		const response = await fetch(BASE_URL, requestOptions)
		if (!response.ok) {
			throw new Error('Ошибка запроса')
		}
		const data = await response.json()
		return data.result
	} catch (error) {
		console.error('Ошибка:', error)
		return []
	}
}

// Сортировка по цене
export const filterIds = async (price: number): Promise<string[]> => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth': authString,
		},
		body: JSON.stringify({
			action: 'filter',
			params: { price: price },
		}),
	}

	try {
		const response = await fetch(BASE_URL, requestOptions)
		if (!response.ok) {
			throw new Error('Ошибка запроса')
		}
		const data = await response.json()
		return data.result
	} catch (error) {
		console.error('Ошибка:', error)
		return []
	}
}
// Сортировка по бренду
export const getBrands = async (): Promise<string[]> => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth': authString,
		},
		body: JSON.stringify({
			action: 'get_fields',
			params: { field: 'brand', offset: 0, limit: 100 },
		}),
	}

	try {
		const response = await fetch(BASE_URL, requestOptions)
		if (!response.ok) {
			throw new Error('Ошибка запроса')
		}
		const data = await response.json()
		// Фильтруем и удаляем пустые значения
		const brands: string[] = data.result.filter(
			(brand: string | null) => brand !== null
		)
		return brands
	} catch (error) {
		console.error('Ошибка:', error)
		return []
	}
}
