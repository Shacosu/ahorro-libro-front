import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import Link from "next/link";
import NavbarItems from "./NavbarItems";
import AuthButtons from "./AuthButtons";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import HamburgerMenu from "./HamburgerMenu";

const prisma = new PrismaClient()

const getUser = async (session: any) => {
	const user = await prisma.users.findFirst({
		where: {
			email: session?.user?.email
		}
	})
	return user
}

export default async function navbar() {
	const session = await auth()
	const user = await getUser(session)
	return (
		<Navbar className="text-white shadow-lg text-[#004e59] py-2" isBlurred isBordered maxWidth="2xl">
			<NavbarBrand title="Ahorro Libro | Tu plataforma de confianza para encontrar los mejores precios en libros.">
				<Link href="/" className="flex items-center">
					<img src="https://c0.klipartz.com/pngpicture/727/528/gratis-png-libro-de-iconos-de-computadora-libros.png" alt="Libroteca" className="size-14 bg-transparent rounded-full mr-2" />
					<p className="font-bold text-2xl text-[#004e59]">Ahorro Libro</p>
				</Link>
			</NavbarBrand>
			<NavbarItems />
			<NavbarContent>
				<AuthButtons user={user} />
			</NavbarContent>
			<HamburgerMenu />
		</Navbar>
	)
}
