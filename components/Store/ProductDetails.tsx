import getProduct from "@/app/lib/getProduct";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import ImageSlider from "./ImageSlider";
import ShoppingButton from "../ShoppingButton";

const ProductDetails = async ({ id }: { id: string }) => {
	const product = await getProduct(id);
	const cartItem = {
		name: product.name,
		productId: product.id,
		image: product.images[0],
		price: product.price,
		quantity: 1,
	};
	return (
		<div className="grid sm:grid-cols-2 gap-4">
			<ImageSlider product={product}></ImageSlider>
			<div>
				<h1 className="text-2xl font-bold">{product.name}</h1>
				<p className="font-bold text-2xl mb-3 text-primary	">${product.price}</p>
				<span className="block text-gray-500 ">description :</span>
				<p className="text-gray-500 leading-7">{product.description}</p>
				<div className="flex justify-between mt-4">
					<div>
						<ShoppingButton cartItem={cartItem}></ShoppingButton>
					</div>
					<Button asChild>
						<Link href="/products/all">Go to Products </Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
