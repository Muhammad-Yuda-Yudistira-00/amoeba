import timeToHuman from "@/utils/timeToHuman"
import ExpireButton from "@/components/fragments/ExpireButton"
import Checklist from "@/types/Checklist"

type FooterProps = {
	expiredAt: string | undefined
	code: string
	setChecklist: React.Dispatch<React.SetStateAction<Checklist | null>>
}

const Footer: React.FC<FooterProps> = ({expiredAt, code, setChecklist}) => {
	const expire: number | undefined = timeToHuman(expiredAt ?? "")
	return(
		<footer className="py-2 px-2">
			<div>
				<p className="text-stone-300">Your checklist active still in <span className="text-yellow-400 font-bold text-sm md:text-lg">{expire} / 30</span> days.</p>
			</div>
			<div>
				<ExpireButton code={code} setChecklist={setChecklist} />
			</div>
		</footer>
	)
}

export default Footer