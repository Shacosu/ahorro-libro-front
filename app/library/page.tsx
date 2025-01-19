import React, { Suspense } from 'react';
import DashboardClient from './DashboardClient';
import { auth } from '@/auth';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

const getBooks = async (session: any, page: number) => {
  const books = await prisma.users.findFirst({
    where: {
      email: session?.user?.email,
    },
    include: {
      list_books: {
        include: {
          books: {
            include: {
              price_history: {
                orderBy: {
                  createdAt: 'desc',
                },
              },
            },
          },
        },
        take: 12,
        skip: (page - 1) * 12,
      },
    },
  });

  const totalBooksQuery = await prisma.users.findFirst({
    where: {
      email: session?.user?.email,
    },
    include: {
      list_books: {
        include: {
          books: true,
        },
      },
    },
  });

  const totalBooks = totalBooksQuery?.list_books?.length || 0;

  return {
    books,
    totalBooks
  };
};

const getUser = async (session: any) => {
  const user = await prisma.users.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  return user;
};

interface DashboardProps {
  searchParams?: Record<string, string | undefined>;
}


// generate static pages
export async function generateStaticParams() {
  const session = await auth();
  if (!session?.user?.email) {
    return [];
  }
  const { books } = await getBooks(session, 1);
  if (!books?.list_books) {
    return [];
  }
  return books.list_books.map((book) => ({ page: book.id }));
}

export default async function Dashboard({ searchParams }: { searchParams: any }) {
  const params = await searchParams
  const page = parseInt(params?.page || '1', 10);

  const session = await auth();
  if (!session?.user?.email) {
    redirect('/');
  }

  const { books, totalBooks } = await getBooks(session, page);
  const user = await getUser(session);
  if (!user) {
    redirect('/');
  }

  if (!books) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardClient books={books.list_books} user={user} totalBooks={totalBooks} />
    </Suspense>
  )
}
