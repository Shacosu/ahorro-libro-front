import React from 'react';
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

export default async function Dashboard({ searchParams }: { searchParams: any }) {
  const page = parseInt(searchParams?.page || '1', 10);

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

  return <DashboardClient books={books.list_books} user={user} totalBooks={totalBooks} />;
}
