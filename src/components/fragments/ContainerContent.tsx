export default function ContainerContent({children}: {children: React.ReactNode}) {
	return(
		<div className="flex flex-col items-center h-screen gap-8 bg-orange-300 py-6 px-8 bg-[url('/themes/background/city-3.jpg')] bg-cover bg-blend-screen bg-bottom w-screen md:w-auto text-blue-700">
			<div className="flex justify-center items-center h-screen">
				{children}
			</div>
		</div>
	)
}