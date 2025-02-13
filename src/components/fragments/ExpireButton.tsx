"use client"

const ExpireButton = ({onExpireClick}: {onExpireClick: () => void}) => {
	return (
		<div className="flex justify-center gap-4 py-1">
			<small>Reset expired date???</small>
			<button className="bg-red-700 rounded-full px-2 text-white border-white border-2 text-xs hover:bg-red-600" onClick={onExpireClick} >Reset</button>
		</div>
	)
}

export default ExpireButton