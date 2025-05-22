export default function ContainerHome({children}: {children: React.ReactNode}) {
	return(
		<div className="flex flex-col justify-center items-center min-h-screen gap-14px-2 bg-[#1a1a1a] bg-[url('https://c4.wallpaperflare.com/wallpaper/644/305/118/pattern-black-gradient-texture-wallpaper-preview.jpg')] bg-cover">
			{children}
		</div>
	)
}