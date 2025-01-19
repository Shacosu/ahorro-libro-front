export default function Loading() {
	return (
		<div className="container mx-auto p-4">
			<div className="rounded overflow-y-auto min-h-full">
				<div className="my-4 flex justify-between items-center sm:flex-row flex-col gap-2">
					<div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
					<div className="flex gap-4">
						<div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
						<div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-5 gap-4 place-items-center">
					{[...Array(10)].map((_, i) => (
						<div key={i} className="w-full border rounded-lg p-3">
							<div className="flex flex-col gap-2">
								{/* Image skeleton */}
								<div className="h-[130px] w-[95px] bg-gray-200 rounded-lg animate-pulse mx-auto" />

								{/* Title and author skeleton */}
								<div className="flex flex-col w-full gap-1.5">
									<div className="h-12 bg-gray-200 rounded animate-pulse" />
									<div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />

									{/* Price info skeleton */}
									<div className="flex justify-around gap-2 border-t pt-2 border-gray-200 mt-1">
										{[...Array(3)].map((_, index) => (
											<div key={index} className="flex flex-col items-start gap-1">
												<div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
												<div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
											</div>
										))}
									</div>
								</div>
							</div>

							{/* Footer buttons skeleton */}
							<div className="flex justify-end gap-2 mt-3">
								<div className="h-8 w-28 bg-gray-200 rounded animate-pulse" />
								<div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
							</div>
						</div>
					))}
				</div>
				<div className="flex justify-center items-center gap-2 mt-4">
					<div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
					<div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
					<div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
				</div>
			</div>
		</div>
	);
}