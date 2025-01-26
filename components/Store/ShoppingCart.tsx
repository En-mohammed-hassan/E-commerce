import redis from "@/app/lib/redis";
import type { Cart } from "@/app/lib/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import DeletingButton from "../DeletingButton";
import { checkOut, deletItem } from "@/app/actions/actions";
import SubmitButton from "../SubmitButton";
import { Card } from "../ui/card";

const Cart = async () => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	let total = 0;
	let totalPrice = 0;
	let cart: Cart | null = null;
	if (user) {
		const redisCart: Cart | null = await redis.get(`cart_${user.id}`);

		total =
			redisCart?.items.reduce((acc, current) => {
				return acc + current.quantity;
			}, 0) || 0;
		totalPrice =
			redisCart?.items.reduce((acc, current) => {
				return acc + current.quantity * current.price;
			}, 0) || 0;
		cart = redisCart;
	}
	return (
		<>
			{user && (
				<Sheet>
					<SheetTrigger asChild>
						<div className=" group flex items-center relative ">
							<ShoppingBagIcon className="cursor-pointer h-8 w-8 text-gray-500 group-hover:text-gray-950 "></ShoppingBagIcon>
							<span className=" font-bold group-hover:translate-x-1 group-hover:scale-150 transition-all text-gray-500 group-hover:text-gray-950">
								{total}
							</span>
						</div>
					</SheetTrigger>
					<SheetTitle></SheetTitle>
					<SheetDescription></SheetDescription>
					<SheetContent>
						{!cart || !cart?.items.length ? (
							<div className="h-[80vh] w-full flex justify-center items-center">
								<Card className="w-80">
									<div className="flex items-center p-6 flex-col">
										<ShoppingBag className="mb-3 h-20 w-20 rounded-lg text-primary"></ShoppingBag>
										<h1 className="mb-3 text-xl font-bold ">
											Shopping cart is empty
										</h1>
										<p className=" mb-3 text-gray-500 text-sm font-medium text-center">
											You dont have any products in your shopping cart{" "}
										</p>
									</div>

									<Button asChild className="p-6 w-full">
										<Link href="/products/all">Shop Now</Link>
									</Button>
								</Card>
							</div>
						) : (
							<div>
								{cart?.items.map((item) => (
									<div
										key={item.productId}
										className=" flex justify-between my-4"
									>
										<Image
											className=" rounded-lg h-24 w-24 object-cover"
											src={item.image}
											width={100}
											height={100}
											alt={item.name}
										></Image>
										<div className="flex flex-col justify-between items-end">
											<p className="font-semibold text-lg ">{`${item.quantity} X ${item.price}$`}</p>
											<form action={deletItem}>
												<input
													type="text"
													readOnly
													hidden
													name="productId"
													value={item.productId}
												/>
												<DeletingButton text="delete"></DeletingButton>
											</form>
										</div>
									</div>
								))}
								<div className="mt-10 justify-between flex ">
									<p className="text-xl font-bold">Total : {totalPrice}</p>
									<form action={checkOut}>
										<SubmitButton text="Check Out"></SubmitButton>
									</form>
								</div>
							</div>
						)}
					</SheetContent>
				</Sheet>
			)}
		</>
	);
};

export default Cart;
