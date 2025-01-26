// import Image from "next/image";
import Hero from "@/components/Store/Hero";
import Landing from "@/components/Store/Landing";
import ProductCard from "@/components/Store/ProductCard";
import getFeaturedProducts from "../lib/getFeaturedProducts";

export default async function Home() {
	const products = await getFeaturedProducts();

	return (
		<>
			<Hero />
			<Landing />
			<div className="m-3">
				<h1 className="text-4xl font-bold tracking-tighter capitalize my-6  ">
					Featured Products
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{products?.map((product) => (
						<ProductCard item={product} key={product.id}></ProductCard>
					))}
				</div>
			</div>
		</>
	);
}
