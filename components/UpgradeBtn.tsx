"use client";

import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UpgradeBtn() {
	const { data: session } = useSession();
	const router = useRouter();
	async function handleSuscribe(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const res = await fetch("/api/suscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: session?.user?.email }),
		});
		const data = await res.json();
		router.push(data.init_point);

	}
	return (
		session ? (
			<Button
				color="warning"
				className="text-white w-full"
				onClick={(e) => handleSuscribe(e as any)}
			>
				Suscribirse
			</Button>
		) : (
			<Button
				color="warning"
				className="text-white w-full"
				as={Link}
				href="/login"
			>
				Iniciar sesión
			</Button>
		)
	)
}
