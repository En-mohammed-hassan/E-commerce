import getFeaturedProducts from "@/app/lib/getFeaturedProducts";
import ProductCard from "@/components/Store/ProductCard";
import ProductDetails from "@/components/Store/ProductDetails";
import React from "react";
type paramsType = Promise<{ id: string }>;

export default async function Page({ params }: { params: paramsType }) {
	const { id } = await params;
	const products = await getFeaturedProducts();
	
	return (
		<div>
			<ProductDetails id={id}></ProductDetails>
			<div>
				<h1 className="text-4xl font-bold tracking-tighter capitalize my-6  ">
					Featured Products
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{products?.map((product) => (
						<ProductCard item={product} key={product.id}></ProductCard>
					))}
				</div>
			</div>
		</div>
	);
}
