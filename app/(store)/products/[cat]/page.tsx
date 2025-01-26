import getProductBycat from "@/app/lib/getProductByCat";
import ProductCard from "@/components/Store/ProductCard";
type paramsType = Promise<{ cat: string }>;

const page = async ({ params }: { params: paramsType }) => {
	const { cat } = await params;

	const products = await getProductBycat(cat);
	return (
		<div>
			<h1 className="text-4xl font-bold tracking-tighter capitalize  ">
				{cat === "all" ? "All Products" : `${cat} Products`}
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{products.map((product) => (
					<ProductCard item={product} key={product.id}></ProductCard>
				))}
			</div>
		</div>
	);
};

export default page;
