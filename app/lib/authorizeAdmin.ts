import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function authorizeAdmin() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	if (!user || user.email !== process.env.ADMIN_EMAIL) {
		return redirect("/");
	}
	return user;
}
