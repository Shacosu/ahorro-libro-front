"use client"

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

export default function RenderBooks({ list }: { list: any }) {
	const formatCurrency = (price: number) => {
		return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
	}
	const minPrice = list.price_history.filter((price: any) => price.price !== 0).reduce((min: number, price: any) => {
		return Math.min(min, price.price)
	}, list.price_history.filter((price: any) => price.price !== 0)[0].price)

	const lastPrice = list.price_history[0].price
	const discount = ((lastPrice - list.price) / lastPrice) * 100

	const getPriceIcon = () => {
		if (list.price < lastPrice) {
			return <TrendingUp className="text-green-500" size={16} />
		} else if (list.price > lastPrice) {
			return <TrendingDown className="text-red-500" size={16} />
		}
		return <Minus className="text-gray-500" size={16} />
	}

	const formatDate = (date: string) => {
		return new Date(date).toLocaleString('es-CL', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		})
	}

	return (
		<Card className="w-full shadow-none border">
			<CardHeader className="flex gap-3">
				<Image
					alt={list.title}
					height={150}
					radius="sm"
					src={list.imageUrl}
					width={100}
					className="object-contain rounded-lg"
				/>
				<div className="flex flex-col flex-1">
					<p className="text-lg font-bold text-[#004e59] line-clamp-2 h-14" title={list.title}>{list.title}</p>
					<p className="text-xs text-default-500">{list.author}</p>
					<div className="flex gap-2 mt-2">
						<Chip size="sm" className="bg-[#004e59] text-white font-bold">
							{formatCurrency(list.price)}
						</Chip>
						{discount > 0 && (
							<Chip color="warning" size="sm" className="flex items-center gap-1 text-white">
								<div className="flex items-center gap-1 cursor-default" title="Respectivo al ultimo precio">
									{discount.toFixed(0)}% OFF {getPriceIcon()}
								</div>
							</Chip>
						)}
					</div>
					<div className="flex flex-col gap-1 mt-2">
						<div className="flex items-center gap-1">
							<p className="text-xs text-default-500">
								Último precio: <span className="font-bold">{formatCurrency(lastPrice)}</span>
							</p>
						</div>
						<p className="text-xs text-default-500">
							Precio más bajo: <span className="font-bold">{formatCurrency(minPrice)}</span>
						</p>
						<p className="text-xs text-default-500" title="Fecha de ultimo cambio de precio">
							{formatDate(list.price_history[0].createdAt)}
						</p>
					</div>
				</div>
			</CardHeader>
			<CardFooter className="gap-2">
				<Button
					className="bg-[#004e59] text-white"
					size="sm"
					as="a"
					href={list.sourceUrl}
					target="_blank"
				>
					Ver en Buscalibre
				</Button>
				<Button
					className="bg-red-500 text-white"
					size="sm"
				>
					Eliminar
				</Button>
			</CardFooter>
		</Card>
	)
}
