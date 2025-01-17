"use client"

import React from "react";
import {
  Navbar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";

export default function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const session = useSession();
	const menuItems = [
		{ name: "Inicio", href: "/" },
		{ name: "Precios", href: "/#pricing" },
		...(session.status === "authenticated"
			? [{ name: "Mi Biblioteca", href: "/library" }]
			: []
		),
	];

  return (
    <Navbar as="div" onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} className="m-0 p-0 w-min !backdrop-filter-none bg-transparent" isBlurred >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden !backdrop-blur-none"

        />
      <NavbarMenu className="mt-4 w-full overflow-hidden !bg-transparent">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Button
              className="w-full"
              href={item.href}
							as={Link}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
