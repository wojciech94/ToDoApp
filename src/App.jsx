import { useState, useEffect } from 'react'
import { Task } from './components/Task/Task'
import { Plus, Sun, Moon, Monitor, Settings } from 'react-feather'
import { theme, saveModeToLocalStorage, saveTasksToLocalStorage, getTasks } from './utils/general'
import { setNewDate } from './utils/timeHelper'

function App() {
	const [inputVal, setInputVal] = useState('')
	const [tasks, setTasks] = useState(getTasks())
	const [priorityValue, setPriorityValue] = useState('')
	const [isDropdownOpened, setIsDropdownOpened] = useState(false)
	const [isSettingsOpened, setIsSettingsOpened] = useState(false)
	const [archiveTime, setArchiveTime] = useState(1)
	const [appTheme, setAppTheme] = useState(theme)
	const [sortType, setSortType] = useState('date')
	const [order, setOrder] = useState('asc')

	useEffect(() => {
		if (tasks) {
			saveTasksToLocalStorage(tasks)
		}
	}, [tasks])

	function createTask() {
		if (inputVal != '') {
			const taskObj = {
				title: `${inputVal}`,
				id: crypto.randomUUID(),
				isEdit: false,
				isDone: false,
				priority: priorityValue,
				createdAt: Date.now(),
				finishedAt: null,
				removeTime: null,
			}
			setTasks(prevTasks => [...prevTasks, taskObj])
			setInputVal('')
			setPriorityValue('')
		}
	}

	const handleSaveTask = (id, inputVal, priorityVal) => {
		setTasks(prevTasks => {
			return prevTasks.map(t => {
				if (t.id === id) {
					return { ...t, title: inputVal, priority: priorityVal, isEdit: false }
				}
				return t
			})
		})
	}

	const handleCheck = id => {
		setTasks(prevTasks => {
			return prevTasks.map(t => {
				const finish = t.isDone === true ? null : Date.now()
				const remove = t.isDone === true ? null : setNewDate(archiveTime)
				if (t.id === id) {
					return { ...t, isDone: !t.isDone, finishedAt: finish, removeTime: remove }
				}
				return t
			})
		})
	}

	function handleRemoveTask(id) {
		const updatedTasks = tasks.filter(task => task.id !== id)
		setTasks(updatedTasks)
	}

	function handleEditTask(id) {
		setTasks(prevTasks => {
			return prevTasks.map(task => {
				if (task.id === id) {
					return { ...task, isEdit: true }
				}
				return task
			})
		})
	}

	function sortByPriority() {
		const sortedItems = prevTasks =>
			[...prevTasks].sort((a, b) => {
				const priorityOrder = { lowest: 0, low: 1, mid: 2, high: 3 }
				const priorityA = priorityOrder[a.priority] || priorityOrder.lowest
				const priorityB = priorityOrder[b.priority] || priorityOrder.lowest
				if (order == 'asc') {
					return priorityA - priorityB
				} else {
					return priorityB - priorityA
				}
			})
		setTasks(sortedItems)
	}

	function sortByDate() {
		const sortedItems = prevTasks =>
			[...prevTasks].sort((a, b) => {
				if (order == 'desc') {
					return a.createdAt - b.createdAt
				} else {
					return b.createdAt - a.createdAt
				}
			})
		setTasks(sortedItems)
	}

	function sortItems() {
		if (sortType == 'priority') {
			sortByPriority()
		} else {
			sortByDate()
		}
	}

	const themeIcon = () => {
		switch (appTheme) {
			case 'system':
				return <Monitor></Monitor>
			case 'light':
				return <Sun></Sun>
			case 'dark':
				return <Moon></Moon>
			default:
				return <Sun></Sun>
		}
	}

	return (
		<div className='bg-slate-200 dark:bg-slate-800'>
			<div className='container-xl min-h-screen mx-auto flex flex-col items-center py-12'>
				<div className='relative bg-slate-400 dark:bg-slate-600 rounded-xl p-4 md:py-8 md:px-12 border dark:text-gray-100 border-slate-500 w-3/6 min-w-[350px] max-w-[800px]'>
					<button
						className='my-3 mx-12 absolute top-0 right-0 hover:text-slate-200 dark:hover:text-slate-800'
						onClick={() => {
							setIsSettingsOpened(!isSettingsOpened)
							setIsDropdownOpened(false)
						}}>
						<Settings></Settings>
					</button>
					<button
						className='themeBtn m-3 absolute top-0 right-0 hover:text-slate-200 dark:hover:text-slate-800'
						onClick={() => {
							setIsDropdownOpened(!isDropdownOpened)
							setIsSettingsOpened(false)
						}}>
						{themeIcon()}
					</button>
					{isSettingsOpened && (
						<div className='absolute flex flex-col gap-2 top-0 right-0 mt-11 me-12 p-2 rounded-md border border-slate-800 bg-slate-400 dark:bg-slate-600'>
							<div className='text-slate-800 dark:text-slate-200 font-semibold'>Sortuj według</div>
							<div className='flex gap-2'>
								<input
									type='radio'
									name='type'
									id='r1'
									value='priority'
									checked={sortType == 'priority'}
									onChange={e => setSortType(e.target.value)}
								/>
								<label htmlFor='r1'>Priorytetu</label>
							</div>
							<div className='flex gap-2'>
								<input
									type='radio'
									name='type'
									id='r2'
									value='date'
									checked={sortType == 'date'}
									onChange={e => setSortType(e.target.value)}
								/>
								<label htmlFor='r2'>Daty dodania</label>
							</div>
							<div className='text-slate-800 dark:text-slate-200 font-semibold'>Kolejność sortowania</div>
							<div className='flex gap-2'>
								<input
									type='radio'
									name='order'
									value='asc'
									id='s1'
									checked={order == 'asc'}
									onChange={e => setOrder(e.target.value)}
								/>
								<label htmlFor='s1'>Rosnąco</label>
							</div>
							<div className='flex gap-2'>
								<input
									type='radio'
									name='order'
									id='s2'
									value='desc'
									checked={order == 'desc'}
									onChange={e => setOrder(e.target.value)}
								/>
								<label htmlFor='s2'>Malejąco</label>
							</div>
							<button
								className='btn text-white rounded bg-green-500 hover:bg-green-600 dark:text-white'
								onClick={sortItems}>
								Zatwierdź
							</button>
						</div>
					)}
					{isDropdownOpened && (
						<ul className='absolute flex gap-1 items-center mt-11 me-2 p-2 top-0 right-0 rounded-md border border-slate-800'>
							<li className='h-6'>
								<button
									onClick={() => {
										setAppTheme('light')
										saveModeToLocalStorage('light')
										setIsDropdownOpened(false)
									}}>
									<Sun></Sun>
								</button>
							</li>
							<li className='h-6'>
								<button
									onClick={() => {
										setAppTheme('dark')
										saveModeToLocalStorage('dark')
										setIsDropdownOpened(false)
									}}>
									<Moon></Moon>
								</button>
							</li>
							<li className='h-6'>
								<button
									onClick={() => {
										setAppTheme('system')
										saveModeToLocalStorage('system')
										setIsDropdownOpened(false)
									}}>
									<Monitor></Monitor>
								</button>
							</li>
						</ul>
					)}
					<h1 className='text-3xl mb-3'>Do zrobienia</h1>
					<h2 className='text-xl mb-2'>Liczba zadań: {tasks.length}</h2>
					<div className='flex flex-wrap items-center'>
						<input
							className='flex-grow my-2 me-2 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-900 dark:text-gray-100'
							placeholder='Dodaj...'
							value={inputVal}
							onChange={e => setInputVal(e.target.value)}></input>
						<select
							className='bg-slate-100 rounded-md p-1 me-2 dark:bg-slate-900'
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
							className='flex justify-center items-center bg-slate-800 border border-slate-800 flex-shrink-0 text-gray-100 font-bold rounded-md w-8 h-8  hover:bg-slate-200 hover:text-slate-800 transition-colors duration-200'
							onClick={createTask}>
							<Plus></Plus>
						</button>
					</div>
					<ul className='mt-3'>
						{tasks.map(t => {
							return (
								<Task
									key={t.id}
									id={t.id}
									title={t.title}
									isEdit={t.isEdit}
									isDone={t.isDone}
									priority={t.priority}
									createdAt={t.finishedAt}
									handleSaveTask={handleSaveTask}
									handleCheck={handleCheck}
									handleRemoveTask={handleRemoveTask}
									handleEditTask={handleEditTask}></Task>
							)
						})}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default App
