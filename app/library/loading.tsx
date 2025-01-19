export default function Loading() {
	return (
		<div className="container mx-auto">
			<div className="rounded overflow-y-auto min-h-full">
				<div className="my-4 flex justify-between items-center sm:flex-row flex-col gap-2">
					<div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
					<div className="flex gap-4">
						<div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
						<div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 place-items-center">
					{[...Array(12)].map((_, i) => (
						<div key={i} className="w-full h-64 bg-gray-200 rounded animate-pulse" />
					))}
				</div>
				<div className="flex justify-center items-center gap-4 mt-4">
					<div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
					<div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
					<div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
				</div>
			</div>
		</div>
	);
}