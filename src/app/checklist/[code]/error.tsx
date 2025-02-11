"use client"

const ErrorPage = ({error, reset}: {error: Error, reset: () => void}) => {
	return(
		<div className="flex flex-col items-center h-screen gap-8 bg-yellow-900 py-6 px-8">
			<div className="flex flex-col justify-center items-center h-screen gap-4">
				<h1 className="text-4xl">Oops! something went wrong.</h1>
				<p>{error.message}</p>
				<button
					className="bg-lime-600 border-lime-700 border-4 px-4 py-2 rounded-lg hover:bg-lime-700 text-stone-800 font-bold"
					onClick={() => reset()}
				>
					Try Again
				</button>
			</div>
		</div>
	)
}

export default ErrorPage