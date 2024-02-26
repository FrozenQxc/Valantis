import { ItemsType } from '../../types/types'
import Skeleton from './Skeleton'

interface Props {
	items: ItemsType[] | undefined
	loading: boolean
}

const Cards = ({ items, loading }: Props) => {
	const skeleton = Array.from({ length: 9 }).map((_, index) => (
		<Skeleton key={index} />
	))

	const card = items?.map((item, index) => (
		<div
			key={index}
			className='flex flex-col shadow-neon text-center text-white items-center p-3 justify-center w-full md:w-[400px] lg:w-[400px] hover:animate-pulse'
		>
			<span>id: {item.id}</span>
			<span>Бренд: {typeof item.brand === 'string' ? item.brand : 'N/A'}</span>
			<span>
				Цена: <i className='text-yellow-300'>{item.price}</i>
			</span>
			<span>{item.product}</span>
			<img
				className='w-20 h-20 m-5 xl:w-24 xl:h-24'
				src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/One_Ring_Blender_Render.png/800px-One_Ring_Blender_Render.png'
				alt='card'
			/>
		</div>
	))

	return (
		<div className='flex flex-wrap justify-center gap-5 p-5 mx-auto md:max-w-4xl lg:max-w-6xl xl:max-w-7xl'>
			{loading ? skeleton : card}
		</div>
	)
}

export default Cards
