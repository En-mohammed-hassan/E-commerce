import getProduct from "@/app/lib/getProduct";
import EditForm from "@/components/EditForm";
type paramsType = Promise<{ id: string }>;

export default async function ProductCreateRoute({
	params,
}: {
	params: paramsType;
}) {
	const { id } = await params;
	const product = await getProduct(id);

	return <EditForm product={product}></EditForm>;
}
