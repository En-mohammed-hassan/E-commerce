import { redirect } from "next/navigation";
import { prisma } from "./db";

export async function getDashboardData() {
	try {
		const productsCount = await prisma.product.count();
		const ordersCount = await prisma.order.count();
		const usersCount = await prisma.user.count();
		const ordersAmount = await prisma.order.findMany({
			select: { amount: true },
		});
		const totalSales = ordersAmount.reduce((acc, cur) => {
			return acc + cur.amount;
		}, 0);
		return { productsCount, ordersAmount, ordersCount, usersCount, totalSales };
	} catch (error) {
		console.log(error);
		redirect("/");
	}
}
