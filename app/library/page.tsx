import React, { Suspense } from 'react';
import DashboardClient from "./DashboardClient";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getBooks = async (session: any, page: number | undefined) => {
	const books = await prisma.users.findFirst({
		where: {
			email: session?.user?.email
		},
		include: {
			list_books: {
				include: {
					books: {
						include: {
							price_history: {
								orderBy: {
									createdAt: 'desc'
								}
							}
						},
					}
				},
				take: 12,
				skip: page ? (page - 1) * 12 : undefined,
			}
		},
	})

	const totalBooks = await prisma.users.findFirst({
		where: {
			email: session?.user?.email
		},
		include: {
			list_books: {
				include: {
					books: true
				}
			}
		}
	})
	return [books, totalBooks?.list_books.length]
}


const getUser = async (session: any) => {
	const user = await prisma.users.findFirst({
		where: {
			email: session?.user?.email
		},
	})
	return user
}

export default async function Dashboard({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const page = (await searchParams).page || 1

	const session = await auth()
	if (!session?.user?.email) {
		return window.location.href = "/"
	}
	const [books, totalBooks] = await getBooks(session, Number(page))
	const user = await getUser(session)


	// @ts-ignore
	return <DashboardClient books={books.list_books} user={user} totalBooks={totalBooks} />
}
