import { redirect } from "next/navigation";
import { prisma } from "./db";

export default async function getData() {
	try {
		const data = await prisma.product.findMany({
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
