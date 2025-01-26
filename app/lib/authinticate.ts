import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function authinticate() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	if (!user) redirect("/");
	return user;
}
