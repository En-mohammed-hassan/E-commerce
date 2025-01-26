import { redirect } from "next/navigation";
import { prisma } from "./db";

export default async function getFeaturedProducts() {
	try {
		const data = await prisma.product.findMany({
			where: {
				isFeatured: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		if (!data) return redirect("/");

		return data;
	} catch (error) {
		redirect("/");
	}
}
