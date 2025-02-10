const timeToHuman = (time: string): number => {
	const expirationDate = new Date(time)
	const currentDate = new Date()

	const localExpirationDate = new Date(expirationDate.getFullYear(), expirationDate.getMonth(), expirationDate.getDate())
	const localCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())

	const diffTime = localExpirationDate.getTime() - localCurrentDate.getTime()
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

	return diffDays
}

export default timeToHuman