export default function ContainerHome({children}: {children: React.ReactNode}) {
	return(
		<div className="flex flex-col justify-center items-center min-h-screen gap-14 bg-cover px-2 bg-[radial-gradient(circle,red,#c8dc7d),url('/themes/background/city-1.jpg')] bg-top bg-blend-overlay">
			{children}
		</div>
	)
}