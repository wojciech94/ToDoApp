import { useState } from 'react'
import { Check } from 'react-feather'
import { Edit, X } from 'react-feather'
import './task.css'

export function Task({
	id,
	title,
	isEdit,
	isDone,
	priority,
	handleSaveTask,
	handleCheck,
	handleEditTask,
	handleRemoveTask,
}) {
	const [inputVal, setInputVal] = useState('')
	const [priorityValue, setPriorityValue] = useState(priority)

	return (
		<div key={id} className='flex flex-nowrap items-center gap-2 border-slate-600 dark:border-slate-400 border-t'>
			{isEdit ? (
				<>
					<input
						value={inputVal}
						className='flex-grow my-2 px-2 py-1 rounded-md dark:text-gray-100 dark:bg-slate-900'
						placeholder={title}
						onChange={e => setInputVal(e.target.value)}></input>
					<select
						className='bg-slate-100 rounded-md p-1 dark:bg-slate-900'
						value={priorityValue}
						onChange={e => setPriorityValue(e.target.value)}>
						<option value='' disabled hidden>
							Wybierz priorytet
						</option>
						<option className='bg-red-600' value='high'>
							Wysoki
						</option>
						<option className='bg-yellow-600' value='mid'>
							Średni
						</option>
						<option className='bg-green-600' value='low'>
							Niski
						</option>
					</select>
					<button
						className='flex justify-center items-center bg-lime-200 border border-lime-900 text-lime-800 w-8 h-8 font-bold rounded-md hover:bg-lime-800 hover:text-lime-200 transition-colors duration-200'
						onClick={() => {
							handleSaveTask(id, inputVal, priorityValue)
							setInputVal('')
						}}>
						<Check />
					</button>
				</>
			) : (
				<>
					<input className='w-5 h-5' type='checkbox' checked={isDone} onChange={() => handleCheck(id)}></input>
					<li
						className={`flex-grow list-item font-semibold my-1 py-2 priority-${priority} ${isDone && 'line-through'}`}>
						{title}
					</li>

					<button
						className='flex justify-center items-center bg-blue-200 border border-blue-900 text-blue-800 w-8 h-8 font-bold rounded-md hover:bg-blue-800 hover:text-blue-200 transition-colors duration-200'
						onClick={() => handleEditTask(id)}>
						<Edit />
					</button>
				</>
			)}
			<button
				className='flex justify-center items-center bg-red-200 border border-red-900 text-red-800 w-8 h-8 font-bold rounded-md hover:bg-red-800 hover:text-red-200 transition-colors duration-200'
				onClick={() => handleRemoveTask(id)}>
				<X></X>
			</button>
		</div>
	)
}
