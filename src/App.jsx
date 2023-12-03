import { useState } from 'react'
import { Task } from './components/Task/Task'
import { Plus, Sun, Moon, Monitor } from 'react-feather'
import { theme, saveToLocalStorage } from './utils/general'

function App() {
	const [inputVal, setInputVal] = useState('')
	const [tasks, setTasks] = useState([])
	const [priorityValue, setPriorityValue] = useState('')
	const [isDropdownOpened, setIsDropdownOpened] = useState(false)
	const [appTheme, setAppTheme] = useState(theme)

	function createTask() {
		if (inputVal != '') {
			const taskObj = {
				title: `${inputVal}`,
				id: crypto.randomUUID(),
				isEdit: false,
				isDone: false,
				priority: priorityValue,
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
				if (t.id === id) {
					return { ...t, isDone: !t.isDone }
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
				<div className='relative bg-slate-400 dark:bg-slate-600 rounded-xl p-8 px-12 border dark:text-gray-100 border-slate-500 w-3/6 min-w-[400px] max-w-[800px]'>
					<button
						className='themeBtn m-3 absolute top-0 right-0 hover:text-slate-200 dark:hover:text-slate-800'
						onClick={() => setIsDropdownOpened(!isDropdownOpened)}>
						{themeIcon()}
					</button>
					{isDropdownOpened && (
						<ul className='absolute flex gap-1 items-center mt-10 me-2 p-1 top-0 right-0 rounded-md border border-slate-800'>
							<li className='h-6'>
								<button
									onClick={() => {
										setAppTheme('light')
										saveToLocalStorage('light')
										setIsDropdownOpened(false)
									}}>
									<Sun></Sun>
								</button>
							</li>
							<li className='h-6'>
								<button
									onClick={() => {
										setAppTheme('dark')
										saveToLocalStorage('dark')
										setIsDropdownOpened(false)
									}}>
									<Moon></Moon>
								</button>
							</li>
							<li className='h-6'>
								<button
									onClick={() => {
										setAppTheme('system')
										saveToLocalStorage('system')
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
							<option className='bg-yellow-600' value='mid'>Średni</option>
							<option className='bg-green-600' value='low'>Niski</option>
						</select>
						<button
							className='flex justify-center items-center bg-slate-800 border border-slate-800 flex-shrink-0 text-gray-100 font-bold rounded-md w-8 h-8  hover:bg-slate-200 hover:text-slate-800 transition-colors duration-200'
							onClick={createTask}>
							<Plus></Plus>
						</button>
					</div>
					<ul className='custom mt-3'>
						{tasks.map(t => {
							return (
								<Task
									key={t.id}
									id={t.id}
									title={t.title}
									isEdit={t.isEdit}
									isDone={t.isDone}
									priority={t.priority}
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
