import type { $Enums } from "@prisma/client";
import React from "react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
type item = {
	id: string;
	name: string;
	description: string;
	status: $Enums.ProductStatus;
	images: string[];
	price: number;
	category: $Enums.Category;
	isFeatured: boolean;
	createdAt: Date;
};

const ProductCard = ({ item }: { item: item }) => {
	return (
		<div className="mt-5">
			<Card className=" overflow-hidden">
				<Carousel>
					<CarouselContent>
						{item.images.map((image) => (
							<CarouselItem key={image}>
								<div className="relative h-[50vh] w-full">
									<Image
										src={image}
										alt={item.name}
										fill
										className=" object-cover rounded-lg"
									></Image>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselNext className="mr-16"></CarouselNext>
					<CarouselPrevious className="ml-16"></CarouselPrevious>
				</Carousel>
				<div className="flex justify-between m-4 items-center">
					<p className="text-xl font-bold ">{item.name}</p>
					<span className="text-primary font-semibold text-sm p-1 rounded-lg bg-primary/15 border border-primary">
						${item.price}
					</span>
				</div>
				<p className="text-gray-500 text-sm  m-4 line-clamp-2">
					{item.description}
				</p>
			</Card>
			<Button className="w-full rounded-lg my-5 " size="lg" asChild>
				<Link href={`/product/${item.id}`}>See Details</Link>
			</Button>
		</div>
	);
};

export default ProductCard;
