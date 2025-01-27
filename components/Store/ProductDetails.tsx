import getProduct from "@/app/lib/getProduct";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import ImageSlider from "./ImageSlider";
import { addItem } from "@/app/actions/actions";
import ShoppingButton from "../ShoppingButton";

const ProductDetails = async ({ id }: { id: string }) => {
	const product = await getProduct(id);
	return (
		<div className="grid sm:grid-cols-2 gap-4">
			<ImageSlider product={product}></ImageSlider>
			<div>
				<h1 className="text-2xl font-bold">{product.name}</h1>
				<p className="font-bold text-2xl mb-3 text-primary	">${product.price}</p>
				<span className="block text-gray-500 ">description :</span>
				<p className="text-gray-500 leading-7">{product.description}</p>
				<div className="flex justify-between mt-4">
					<form action={addItem}>
						<input type="text" hidden value={id} name="productId" readOnly />
						<ShoppingButton></ShoppingButton>
					</form>
					<Button className="" asChild>
						<Link href="/products/all">Go to Products </Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
