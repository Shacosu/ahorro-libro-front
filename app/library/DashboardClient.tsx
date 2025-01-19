"use client"

import React, { useCallback } from 'react';
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

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)
			return params.toString()
		},
		[searchParams]
	)



	const currentPage = Number(searchParams.get("page")) || 1;
	const totalPages = Math.ceil(totalBooks / 12);



	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			router.push(pathname + '?' + createQueryString('page', newPage.toString()));
		}
	};


	return (
		<div className="container mx-auto">
			<div className="rounded overflow-y-auto min-h-full">
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
				{booksList.length > 0 && (
					<div className="flex justify-center items-center gap-4 mt-4">
						<Button
							isIconOnly
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1 || booksList.length === 0}
							className="bg-[#004e59] disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<ChevronLeft className="text-white" />
						</Button>
						<span className="text-lg">
							Página {currentPage} de {totalPages}
						</span>
						<Button
							isIconOnly
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages || booksList.length === 0}
							className="bg-[#004e59] disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<ChevronRight className="text-white" />
						</Button>
					</div>
				)}
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