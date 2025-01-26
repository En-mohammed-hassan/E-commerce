import { prisma } from "./db";
import { notFound, redirect } from "next/navigation";

export default function getProductBycat(category: string) {
	switch (category) {
		case "men": {
			try {
				const data = prisma.product.findMany({
					where: {
						category: "men",
					},
				});
				if (!data) return redirect("/");

				return data;
			} catch (error) {
				redirect("/");
			}
		}
		case "women": {
			try {
				const data = prisma.product.findMany({
					where: {
						category: "women",
					},
				});
				if (!data ) return redirect("/");

				return data;
			} catch (error) {
				redirect("/");
			}
		}
		case "all": {
			try {
				const data = prisma.product.findMany();
				if (!data) return redirect("/");

				return data;
			} catch (error) {
				redirect("/");
			}
		}

		default: {
			notFound();
		}
	}
}
