"use client"
import { NavbarItem } from "@nextui-org/navbar"
import { NavbarContent } from "@nextui-org/navbar"
import { BookOpenIcon, CoinsIcon, UsersIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavbarItems() {
	const pathname = usePathname();
	return (
		pathname === "/" ? (
			<NavbarContent className="!justify-center items-center gap-8 hidden lg:flex">
				<NavbarItem>
					<Link href="/#about" className="hover:text-yellow-300 transition-colors duration-500 flex items-center gap-2">
						<UsersIcon size={20} />
						<p>Nosotros</p>
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href="/#pricing" className="hover:text-yellow-300 transition-colors duration-500 flex items-center gap-2">
						<CoinsIcon size={20} />
						<p>Precios</p>
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href="/#features" className="hover:text-yellow-300 transition-colors duration-500 flex items-center gap-2">
						<BookOpenIcon size={20} />
						<p>Que es Ahorro Libro?</p>
					</Link>
				</NavbarItem>
			</NavbarContent>
		) : null
	)
}
