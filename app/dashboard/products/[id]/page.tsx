import getProduct from "@/app/lib/getProduct";
import EditForm from "@/components/EditForm";

export default async function ProductCreateRoute({
	params,
}: {
	params: { id: string };
}) {
	const product = await getProduct(params.id);

	return <EditForm product={product}></EditForm>;
}
