"use client"

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { TrendingDown, TrendingUp, Minus, TrashIcon, Trash2Icon, SendIcon } from "lucide-react";

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
			return <TrendingUp size={16} />
		} else if (list.price > lastPrice) {
			return <TrendingDown size={16} />
		}
		return <Minus className="text-gray-500" size={16} />
	}

	const formatDate = (date: string) => {
		const now = new Date();
		const updateDate = new Date(date);
		const diffTime = Math.abs(now.getTime() - updateDate.getTime());
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
		const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
		const diffMinutes = Math.floor(diffTime / (1000 * 60));

		if (diffMinutes < 60) {
			return `hace ${diffMinutes} minutos`;
		} else if (diffHours < 24) {
			return `hace ${diffHours} horas`;
		} else if (diffDays === 1) {
			return 'ayer';
		} else if (diffDays < 7) {
			return `hace ${diffDays} días`;
		} else if (diffDays < 14) {
			return 'hace 1 semana';
		} else if (diffDays < 30) {
			return `hace ${Math.floor(diffDays / 7)} semanas`;
		} else if (diffDays < 60) {
			return 'hace 1 mes';
		} else {
			return `hace ${Math.floor(diffDays / 30)} meses`;
		}
	}

	return (
		<Card className="w-full shadow-none border">
			<CardHeader className="flex flex-col gap-3">
				<Image
					alt={list.title}
					height={135}
					radius="sm"
					src={list.imageUrl}
					width={100}
					className="object-contain rounded-lg"
				/>
				<div className="flex flex-col w-full">
					<p className="text-lg font-bold text-[#004e59] line-clamp-2 h-14" title={list.title}>{list.title}</p>
					<p className="text-xs text-default-500 mb-2">- {list.author}</p>
					<div className="flex justify-around gap-2 border-t pt-2 border-gray-200">
						<div className="flex flex-col items-start gap-1">
							<label className="text-xs text-default-500">Actual</label>
							<div className="flex items-center gap-1">
								<Chip size="sm"  radius="sm" className="bg-[#004e59] text-white font-bold" >
									{formatCurrency(lastPrice)}
								</Chip>
							</div>
						</div>
						<div className="flex flex-col items-start gap-1">
							<label className="text-xs text-default-500">Minimo</label>
							<Chip size="sm" radius="sm" className="bg-[#004e59] text-white font-bold">
								{formatCurrency(minPrice)}
							</Chip>
						</div>
						<div className="flex flex-col items-start gap-1">
							<label className="text-xs text-default-500 capitalize">{formatDate(list.price_history[0].createdAt)}</label>
							<div className="flex items-center gap-1">
								<Chip size="sm" radius="sm" className="bg-[#004e59] text-white font-bold" title={formatDate(list.price_history[0].createdAt)}>
									{formatCurrency(list.price)}
								</Chip>
							</div>
						</div>
						<div className="absolute top-2 right-2 z-50">
							{discount > 0 && (
								<Chip color="warning" size="sm" className="flex items-center gap-1 text-white">
									<div className="flex items-center gap-1 cursor-default" title="Respectivo al ultimo precio">
										{discount.toFixed(0)}% {getPriceIcon()}
									</div>
								</Chip>
							)}
						</div>
					</div>
				</div>
			</CardHeader>
			<CardFooter className="flex justify-end gap-2 pt-1">
				<Button
					className="bg-yellow-600 text-white"
					size="sm"
					as="a"
					href={list.sourceUrl}
					target="_blank"
				>
					<SendIcon size={14} /> Ver en Buscalibre
				</Button>
				<Button
					className="bg-red-500 text-white !min-w-min"
					size="sm"
				>
					<Trash2Icon size={14} />
				</Button>
			</CardFooter>
		</Card>
	)
}
