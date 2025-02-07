import timeToHuman from "@/utils/timeToHuman"
import ExpireButton from "@/components/fragments/ExpireButton"

type FooterProps = {
	expiredAt: string
	onExpireclick: () => void
}

const Footer: React.FC<FooterProps> = ({expiredAt, onExpireClick}) => {
	const expire = timeToHuman(expiredAt)
	return(
		<footer>
			<div>
				<p className="text-stone-300">Your checklist active still in <span className="text-yellow-400 font-bold text-lg">{expire} / 30</span> days.</p>
			</div>
			<div>
				<ExpireButton expiredAt={expiredAt} onExpireClick={onExpireClick} />
			</div>
		</footer>
	)
}

export default Footer