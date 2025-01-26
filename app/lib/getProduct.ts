import { redirect } from "next/navigation";
import { prisma } from "./db";

export default async function getProduct(productId: string) {
	try {
		const data = await prisma.product.findUnique({
			where: {
				id: productId,
			},
		});
		if (!data) return redirect("/");

		return data;
	} catch (error) {
		redirect("/");
	}
}
