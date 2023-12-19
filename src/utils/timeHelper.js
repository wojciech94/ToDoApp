export function setNewDate(days) {
	const timestamp = Date.now()
	const currentDate = new Date(timestamp)
	const newDate = new Date(currentDate)
	newDate.setDate(currentDate.getDate() + days)
	const newTimestamp = newDate.getTime()
	return newTimestamp
}

export function validateExpirationTime(timestamp) {
	return timestamp == null || timestamp - Date.now() > 0
}

export function getDateFromTimestamp(timestamp) {
	return new Date(timestamp)
}

export function getFromattedTime(timestamp) {
	const date = new Date(timestamp)
	const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
	return formattedDate
}
