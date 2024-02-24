import md5 from 'crypto-js/md5'
import { ItemsType } from '../../types/types'

const password = 'Valantis'
const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '')
const authString = md5(`${password}_${timestamp}`).toString()

export const getIds = async (
	offset: number = 10,
	limit: number = 10
): Promise<string[]> => {
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
		const response = await fetch(
			'https://api.valantis.store:41000/',
			requestOptions
		)
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
		const response = await fetch(
			'https://api.valantis.store:41000/',
			requestOptions
		)

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
