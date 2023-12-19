import { validateExpirationTime } from './timeHelper'

export let theme

if (localStorage.getItem('theme')) {
	theme = localStorage.getItem('theme')
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
	theme = 'system'
} else {
	theme = 'light'
	localStorage.setItem('theme', 'light')
}
if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
	document.body.parentElement.className = 'dark'
}

export function getTasks() {
	const tasks = [...JSON.parse(localStorage.getItem('tasks'))]
	const filteredTasks = tasks.filter(t => validateExpirationTime(t.removeTime) === true)
	return filteredTasks || []
}

export function saveTasksToLocalStorage(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

export function saveModeToLocalStorage(mode) {
	if (mode === 'light') {
		localStorage.setItem('theme', 'light')
		document.body.parentElement.className = ''
	} else if (mode === 'dark') {
		localStorage.setItem('theme', 'dark')
		document.body.parentElement.className = 'dark'
	} else {
		localStorage.setItem('theme', 'system')
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.body.parentElement.className = 'dark'
		} else {
			document.body.parentElement.className = ''
		}
	}
}
