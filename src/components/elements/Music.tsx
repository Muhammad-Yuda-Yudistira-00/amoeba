export default function Music () {
	return (
		<div className={`absolute opacity-75 animate-pulse w-full left-0 top-0 overflow-hidden`}>
			<iframe style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/playlist/3SUN5AuTzxUaQrC55wB7RX?utm_source=generator" width="100%" height="152" frameBorder="0" allowFullScreen={false} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
		</div>
	)
}