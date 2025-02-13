export default function Music () {
	return (
		<div className="fixed bottom-6 left-6 w-2/5 opacity-75 animate-pulse">
			<iframe style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/playlist/3SUN5AuTzxUaQrC55wB7RX?utm_source=generator" width="50%" height="152" frameBorder="0" allowFullScreen={false} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
		</div>
	)
}