"use client"

import { signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import { NavbarItem } from "@nextui-org/navbar";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@nextui-org/user";
import { BookmarkPlus, LogOutIcon, StarIcon } from "lucide-react";
import Link from "next/link";


export default function AuthButtons({ user }: { user: any }) {
	const session = useSession();
	const router = useRouter();
	const pathname = usePathname();

	const plan = user?.plan || 'Free'
	return (
		<div className="flex items-center justify-end gap-2 w-full">
			{session.status === 'authenticated' ? (
				<>
					<NavbarItem>
						{!pathname.includes('/library') &&
							<Button onClick={() => router.push('/library')} className="bg-[#004e59] text-white transition-colors duration-500">
								Mi biblioteca
							</Button>}
					</NavbarItem>
					<NavbarItem className="hidden sm:flex">
						<User className="p-0 m-0" name={user?.name} description={
							<div className="flex items-center gap-1">
								Plan: <span className="text-[#004e59] font-bold border-b">{plan}</span>
							</div>
						} />
					</NavbarItem>
					<NavbarItem className="hidden sm:flex">
						<LogOutIcon size={24} className=" text-white bg-[#004e59] rounded p-1 cursor-pointer ml-4" onClick={() => signOut({ callbackUrl: '/' })} />
					</NavbarItem>

				</>
			) : (
				<>
					<NavbarItem className="hidden sm:flex">
						<Button onClick={() => router.push('/login')} className="text-[#004e59] transition-colors duration-500">
							Iniciar sesión
						</Button>
					</NavbarItem>
					<NavbarItem className="hidden sm:flex">
						<Button onClick={() => router.push('/register')} className="bg-[#004e59] transition-colors duration-500 text-white">
							Registrarse
						</Button>
					</NavbarItem>
				</>
			)
			}
		</div >
	)
}