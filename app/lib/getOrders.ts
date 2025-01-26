import authinticate from "./authinticate";
import { prisma } from "./db";
import { redirect } from "next/navigation";

export default async function getOrders() {
	await authinticate();

	try {
		const data = await prisma.order.findMany({
			orderBy: { createdAt: "desc" },
			select: {
				amount: true,
				createdAt: true,
				id: true,
				status: true,
				userId: true,
				User: {
					select: {
						email: true,
						firstName: true,
						profileImage: true,
					},
				},
			},
		});
		if (!data) {
			return null;
		}
		return data;
	} catch (error) {
		console.log(error);
		redirect("/");
	}
}
