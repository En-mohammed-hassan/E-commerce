import { deletProduct } from "@/app/actions/actions";
import DeletingButton from "@/components/DeletingButton";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
type paramsType = Promise<{ id: string }>;

const DeletePage = async ({ params }: { params: paramsType }) => {
	const { id } = await params;
	return (
		<div className="w-full h-[80vh] flex justify-center items-center">
			<Card className="max-w-xl">
				<CardHeader>
					<CardTitle className="text-3xl">
						Are you sure you want to delete the product
					</CardTitle>
					<CardDescription>
						This action cannot be undo , this will permanetly delete this
						product and remove all data from our server
					</CardDescription>
				</CardHeader>
				<CardFooter className="flex justify-between">
					<Button asChild variant="secondary">
						<Link href="/dashboard/products">Cancel</Link>
					</Button>

					<form action={deletProduct}>
						<input type="hidden" value={id} name="productId" />
						<DeletingButton text="Delete"></DeletingButton>
					</form>
				</CardFooter>
			</Card>
		</div>
	);
};

export default DeletePage;
