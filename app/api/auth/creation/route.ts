import { prisma } from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
	const dashboardPath = process.env.KINDE_SITE_URL + "/dashboard";
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	if (!user || !user.id || user === null) {
		throw new Error("no user found :authenticated is not omplete");
	}
	let dbUser = await prisma.user.findUnique({
		where: {
			id: user.id,
		},
	});

	if (!dbUser) {
		dbUser = await prisma.user.create({
			data: {
				id: user.id ?? "",
				firstName: user.given_name ?? "",
				lastName: user.family_name ?? "",
				email: user.email ?? "",
				profileImage:
					user.picture ?? "https://avatar.vercel.sh/rauchg.svg?text=User",
			},
		});
	}

	return NextResponse.redirect(dashboardPath);
}
