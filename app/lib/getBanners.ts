import { prisma } from "@/app/lib/db";
import { redirect } from "next/navigation";

const getabanners = async () => {
	try {
		const data = await prisma.banner.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});
		if (!data) return redirect("/");

		return data;
	} catch (error) {
		redirect("/");
	}
};
export default getabanners;
