"use client"

import React, { useCallback, useEffect, useState } from 'react';
import Link from "next/link";
import RenderBooks from "@/components/dashboard/RenderBooks";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button, useDisclosure } from "@nextui-org/react";
import { PlusCircle, Upload, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import AddBookModal from "./components/AddBookModal";
import ImportListModal from "./components/ImportListModal";



export default function DashboardClient({ books: booksList, user, totalBooks }: { books: any, user: any, totalBooks: number }) {
	const { isOpen: isAddBookOpen, onOpen: onAddBookOpen, onClose: onAddBookClose } = useDisclosure();
	const { isOpen: isImportOpen, onOpen: onImportOpen, onClose: onImportClose } = useDisclosure();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isLoading, setIsLoading] = useState(false);

	const createQueryString =
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)
		return params.toString()
	}



	const currentPage = Number(searchParams.get("page")) || 1;
	const totalPages = Math.ceil(totalBooks / 12);



	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setIsLoading(true);
			router.push(pathname + "?" + createQueryString('page', newPage.toString()));
		}
	};

	useEffect(() => {
		setIsLoading(false);
	}, [booksList]);

	const getPageNumbers = useCallback(() => {
		const pages = [];
		const maxVisiblePages = 5;
		const halfVisible = Math.floor(maxVisiblePages / 2);

		let startPage = Math.max(currentPage - halfVisible, 1);
		let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(endPage - maxVisiblePages + 1, 1);
		}

		if (startPage > 1) {
			pages.push(1);
			if (startPage > 2) pages.push('...');
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (endPage < totalPages) {
			if (endPage < totalPages - 1) pages.push('...');
			pages.push(totalPages);
		}

		return pages;
	}, [currentPage, totalPages]);

	const paginationSection = (
		<div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
			<Button
				isIconOnly
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="bg-[#004e59] disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<ChevronLeft className="text-white" />
			</Button>

			{getPageNumbers().map((page, index) => (
				typeof page === 'number' ? (
					<Button
						key={index}
						onClick={() => handlePageChange(page)}
						className={`min-w-[40px] ${currentPage === page
							? 'bg-[#004e59] text-white'
							: 'bg-white text-[#004e59] border-[#004e59] border'}`}
					>
						{page}
					</Button>
				) : (
					<span key={index} className="px-2">...</span>
				)
			))}

			<Button
				isIconOnly
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="bg-[#004e59] disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<ChevronRight className="text-white" />
			</Button>
		</div>
	);

	if (isLoading) {
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
					{paginationSection}
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			<div className="rounded overflow-y-auto ">
				<div className="my-4 flex justify-between items-center sm:flex-row flex-col gap-2">
					<h1 className="text-3xl font-bold text-[#004e59]">Mi Biblioteca</h1>
					<div className="flex gap-4 flex">
						<Button
							color="primary"
							onClick={onAddBookOpen}
							className="bg-[#004e59]"
							startContent={<PlusCircle size={20} />}
						>
							Agregar Libro
						</Button>
						{user.plan === "Premium" ? (
							<Button
								color="primary"
								onClick={onImportOpen}
								className="bg-[#004e59]"
								startContent={<Upload size={20} />}
							>
								Importar
							</Button>
						) : (
							<Button
								as={Link}
								href="/#pricing"
								color="primary"
								className="bg-[#004e59]"
								startContent={<Sparkles size={20} />}
							>
								Premium
							</Button>
						)}
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 place-items-center">
					{booksList.length > 0 && (
						booksList.map((list: any) => (
							<RenderBooks key={list.id} list={list.books} />
						))
					)}
				</div>
				{booksList.length > 0 && paginationSection}
				{booksList.length === 0 && (
					<div className="text-lg text-gray-500 text-center font-bold flex flex-col gap-2 items-center">
						<span className="text-xl">No tienes libros en tu biblioteca</span>
						<span className="text-sm">Agrega un libro a tu biblioteca para empezar a ahorrar</span>
					</div>
				)}
			</div>

			<AddBookModal
				isOpen={isAddBookOpen}
				onClose={onAddBookClose}
			/>

			<ImportListModal
				isOpen={isImportOpen}
				onClose={onImportClose}
				user={user}
			/>
		</div>
	);
}