interface MusicProps {
	forMobile? : string
}

export default function Music ({forMobile}: MusicProps) {
	return (
		<div className={`${forMobile} md:fixed md:bottom-6 md:left-6 opacity-75 animate-pulse w-full md:w-72 left-0 top-0`}>
			<iframe style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/playlist/3SUN5AuTzxUaQrC55wB7RX?utm_source=generator" width="100%" height="152" frameBorder="0" allowFullScreen={false} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
		</div>
	)
}