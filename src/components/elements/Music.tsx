export default function Music () {
	return (
		<div className={`absolute opacity-75 w-full left-0 top-0 px-8 pr-80`}>
			<div className="flex justify-center items-center h-full py-8">
	            <p className="text-7xl font-extrabold text-white font-horsePuke">play music</p>
	          </div>
			<iframe style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/playlist/3SUN5AuTzxUaQrC55wB7RX?utm_source=generator" width="100%" height="152" frameBorder="0" allowFullScreen={false} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
		</div>
	)
}