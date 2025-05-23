import { ReactNode } from "react";

import type { Metadata } from "next";
import "@/app/globals.css";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { unstable_noStore as noStore } from "next/cache";
import DashboardNavigation from "@/components/Dashboard/DashboardNavigation";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardLayout({
	children,
}: {
	children: ReactNode;
}) {
	noStore();
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user || user.email !== process.env.ADMIN_EMAIL) {
		return redirect("/");
	}
	return (
		<AuthProvider>
			<html lang="en">
				<body className="">
					<div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white z-10">
							<nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
								<DashboardNavigation />
							</nav>

							<Sheet>
								<SheetTrigger asChild>
									<Button
										className="shrink-0 md:hidden"
										variant="outline"
										size="icon"
									>
										<MenuIcon className="h-5 w-5" />
									</Button>
								</SheetTrigger>
								<SheetTitle></SheetTitle>
								<SheetDescription></SheetDescription>
								<SheetContent side="left">
									<nav className="flex flex-col gap-6 text-lg font-medium mt-5">
										<DashboardNavigation />
									</nav>
								</SheetContent>
							</Sheet>

							<div className=" flex justify-between items-center gap-4">
								<Button>
									<Link href="/">Go to Home</Link>
								</Button>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<button>
											<Image
												src={
													user?.picture ??
													"https://avatar.vercel.sh/rauchg.svg?text=User"
												}
												alt="profile"
												width={33}
												height={33}
												className="rounded-full"
											></Image>
										</button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>{user.email}</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem asChild>
											<LogoutLink>Logout</LogoutLink>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</header>
						<main className="my-5">{children}</main>
					</div>
				</body>
			</html>
		</AuthProvider>
	);
}
