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
	createdAt,
	handleSaveTask,
	handleCheck,
	handleEditTask,
	handleRemoveTask,
}) {
	const [inputVal, setInputVal] = useState(title)
	const [priorityValue, setPriorityValue] = useState(priority)
	let priorityBadge

	switch (priority) {
		case 'low':
			priorityBadge = 'bg-green-600'
			break
		case 'mid':
			priorityBadge = 'bg-yellow-600'
			break
		case 'high':
			priorityBadge = 'bg-red-600'
			break
		default:
			priorityBadge = 'bg-sky-600'
			break
	}

	return (
		<li key={id} className='list-item list-none border-bottom'>
			{isEdit ? (
				<div className='flex flex-wrap items-center gap-2 border-slate-600 dark:border-slate-400 border-t py-2'>
					<span className={`w-2 h-6 rounded-md ${priorityBadge}`}></span>
					<input
						value={inputVal}
						className='flex-grow px-2 py-1 rounded-md dark:text-gray-100 dark:bg-slate-900'
						placeholder={title}
						onChange={e => setInputVal(e.target.value)}></input>
					<div className='flex gap-2'>
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
							}}>
							<Check />
						</button>
						<button
							className='flex justify-center items-center bg-red-200 border border-red-900 text-red-800 w-8 h-8 font-bold rounded-md hover:bg-red-800 hover:text-red-200 transition-colors duration-200'
							onClick={() => handleRemoveTask(id)}>
							<X></X>
						</button>
					</div>
				</div>
			) : (
				<div className='flex gap-2 items-center border-t border-t-slate-600 dark:border-t-slate-400'>
					<span className={`flex-shrink-0 w-2 h-6 rounded-md ${priorityBadge}`}></span>
					<input
						id={`chbxDone` + id}
						className='flex-shrink-0 w-5 h-5'
						type='checkbox'
						checked={isDone}
						onChange={() => handleCheck(id)}></input>
					<label
						htmlFor={`chbxDone` + id}
						className={`flex-grow text-break font-semibold my-1 py-2 ${isDone && 'line-through'}`}>
						{title}
					</label>
					<button
						className='flex-shrink-0 flex justify-center items-center bg-blue-200 border border-blue-900 text-blue-800 w-8 h-8 font-bold rounded-md hover:bg-blue-800 hover:text-blue-200 transition-colors duration-200'
						onClick={() => handleEditTask(id)}>
						<Edit />
					</button>
					<button
						className='flex-shrink-0 flex justify-center items-center bg-red-200 border border-red-900 text-red-800 w-8 h-8 font-bold rounded-md hover:bg-red-800 hover:text-red-200 transition-colors duration-200'
						onClick={() => handleRemoveTask(id)}>
						<X></X>
					</button>
				</div>
			)}
		</li>
	)
}
