const Loading = () => {
	return(
		<div className="flex flex-col items-center h-screen gap-8 bg-red-700 py-6 px-8 bg-[url('/themes/background/city-1.jpg')] bg-cover bg-bottom bg-blend-screen">
			<div className="flex justify-center items-center h-screen">
				<h1 className="text-2xl text-black">Loading...</h1>
			</div>
		</div>
	)
}

export default Loading