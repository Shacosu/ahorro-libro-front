"use client"

import React, { useState } from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import AuthButtons from "./AuthButtons";
import { usePathname } from "next/navigation";

export default function NavbarClient({ user }: { user: any }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const menuItems = [
		{ name: "Inicio", href: "/" },
		{ name: "Precios", href: "/#pricing" },
		{ name: "Mi Biblioteca", href: "/library" },
	];

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="xl" className="bg-white">
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<Link href="/" className="flex items-center gap-2">
						<Image
							src="/logo.png"
							alt="Logo"
							width={40}
							height={40}
							className="object-contain"
						/>
						<p className="font-bold text-inherit text-[#004e59]">BookTracker</p>
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{menuItems.map((item, index) => (
					<NavbarItem key={`${item.name}-${index}`} isActive={pathname === item.href}>
						<Link
							href={item.href}
							className={`${pathname === item.href ? 'text-[#004e59] font-bold' : ''}`}
						>
							{item.name}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>

			<NavbarContent justify="end">
				<div className="hidden sm:flex">
					<AuthButtons user={user} />
				</div>
			</NavbarContent>

			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item.name}-${index}`}>
						<Link
							href={item.href}
							className={`w-full ${pathname === item.href ? 'text-[#004e59] font-bold' : ''}`}
						>
							{item.name}
						</Link>
					</NavbarMenuItem>
				))}
				<NavbarMenuItem>
					<div className="mt-4">
						<AuthButtons user={user} />
					</div>
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
}