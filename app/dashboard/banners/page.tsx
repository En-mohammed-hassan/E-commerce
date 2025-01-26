import getabanners from "@/app/lib/getBanners";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenuItem,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
	const data = await getabanners();
	return (
		<>
			<div className="flex justify-end mb-3">
				<Button className="" asChild>
					<Link href="/dashboard/banners/create">
						<PlusCircleIcon></PlusCircleIcon>
						Add Banner
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Banners</CardTitle>
					<CardDescription>Manage your Banners</CardDescription>
				</CardHeader>

				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Image</TableHead>
								<TableHead>Title</TableHead>
								<TableHead className="text-end">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.map((item) => (
								<TableRow key={item.id}>
									<TableCell>
										<Image
											src={item.image}
											alt="banner image "
											width={64}
											height={64}
											className="object-cover w-16 h-16"
										></Image>
									</TableCell>
									<TableCell className="text-l font-bold">
										{item.title}
									</TableCell>
									<TableCell className="text-end">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<MoreHorizontal className="h-4 w-4"></MoreHorizontal>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<DropdownMenuSeparator></DropdownMenuSeparator>
												<DropdownMenuItem>
													<Link href={`/dashboard/banners/${item.id}/delete`}>
														Delete
													</Link>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</>
	);
};

export default page;
