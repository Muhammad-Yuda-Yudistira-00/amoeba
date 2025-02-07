"use client"

const ExpireButton = ({expiredAt, onExpireClick}: {expiredAt: string, onExpireClick: () => void}) => {
	return (
		<div className="flex justify-center gap-4 py-2">
			<small>Reset expired date???</small>
			<button className="bg-red-800 rounded-full px-2 text-white border-white border-2 text-xs hover:bg-red-700" onClick={onExpireClick} >Reset</button>
		</div>
	)
}

export default ExpireButton