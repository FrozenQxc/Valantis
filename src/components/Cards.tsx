import { ItemsType } from '../../types/types'

interface Props {
	items: ItemsType[] | undefined
}

const Cards = ({ items }: Props) => {
	return (
		<div className='flex gap-10 mt-[40px] justify-center p-5 mx-auto w-[1200px] flex-wrap '>
			{items &&
				Object.values(items).map((item, index) => (
					<div key={index}>
						<div className='flex flex-col shadow-neon text-center text-white items-center p-3  '>
							<span>
								Бренд: {typeof item.brand === 'string' ? item.brand : 'N/A'}
							</span>
							<span>
								Цена: <i className=' text-yellow-300'>{item.price}</i>
							</span>
							<span>{item.product}</span>
							<img
								className='w-[100px] h-[100px] m-5'
								src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/One_Ring_Blender_Render.png/800px-One_Ring_Blender_Render.png'
								alt='card'
							/>
						</div>
					</div>
				))}
		</div>
	)
}

export default Cards
