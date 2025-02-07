const timeToHuman = (time: string): number => {
	const expirationDate = new Date(time)
	const currentDate = new Date()

	const diffTime = expirationDate.getTime() - currentDate.getTime()
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

	return diffDays
}

export default timeToHuman