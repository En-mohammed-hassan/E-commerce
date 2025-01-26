"use client";
import type { $Enums } from "@prisma/client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

type productType = {
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

const ImageSlider = ({ product }: { product: productType }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const getNextIndex = () => {
		if (currentIndex === product.images.length - 1) setCurrentIndex(0);
		else setCurrentIndex((prev) => prev + 1);
	};
	const getPrevIndex = () => {
		if (currentIndex === 0) setCurrentIndex(product.images.length - 1);
		else setCurrentIndex((prev) => prev - 1);
	};

	return (
		<div className="grid grid-cols-5 gap-2">
			<div className="col-span-5 h-[70vh] relative ">
				<Image
					src={product.images[currentIndex]}
					alt="product"
					fill
					className="object-cover object-center rounded-md "
				></Image>
				<Button
					variant="ghost"
					className="absolute top-1/2 right-3 "
					onClick={getNextIndex}
				>
					<ChevronRight className=""></ChevronRight>
				</Button>
				<Button
					variant="ghost"
					className="absolute top-1/2 left-3"
					onClick={getPrevIndex}
				>
					<ChevronLeft></ChevronLeft>
				</Button>
			</div>
			{product.images.map((image, index) => (
				<div
					key={index}
					className={
						index == currentIndex
							? "border-2 border-primary h-[15vh] relative w-full rounded-lg"
							: "h-[15vh] relative w-full rounded-lg"
					}
				>
					<Image
						onClick={() => setCurrentIndex(index)}
						src={image}
						alt="product"
						fill
						className="object-cover object-center rounded-md "
					></Image>
				</div>
			))}
		</div>
	);
};

export default ImageSlider;
