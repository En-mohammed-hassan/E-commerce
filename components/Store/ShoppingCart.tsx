"use client";

import redis from "@/app/lib/redis";
import type { Cart } from "@/app/lib/types";
import { Loader2, ShoppingBag, ShoppingBagIcon } from "lucide-react";
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
import { checkOut } from "@/app/actions/actions";
import SubmitButton from "../SubmitButton";
import { Card } from "../ui/card";
import useCartStore from "@/stores/useCartStore";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useState } from "react";

const Cart = () => {
	const { user } = useKindeAuth();
	const { cart, removeItem } = useCartStore();
	let total = 0;
	let totalPrice = 0;
	const [pending, setPending] = useState(false);
	const deleteItem = (productId: string) => {
		setPending(true);
		removeItem(productId);
		setPending(false);
	};
	if (user) {
		total =
			cart?.items.reduce((acc, current) => {
				return acc + current.quantity;
			}, 0) || 0;
		totalPrice =
			cart?.items.reduce((acc, current) => {
				return acc + current.quantity * current.price;
			}, 0) || 0;
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

											<div>
												{pending ? (
													<Button disabled variant="destructive">
														<Loader2 className="animate-spin w-5 h-5"></Loader2>
														Loading
													</Button>
												) : (
													<Button
														type="submit"
														onClick={() => {
															deleteItem(item.productId);
														}}
														variant="destructive"
													>
														Delete
													</Button>
												)}
											</div>
										</div>
									</div>
								))}
								<div className="mt-10 justify-between flex ">
									<p className="text-xl font-bold">Total : {totalPrice}</p>
									<form
										action={() => {
											checkOut(cart);
										}}
									>
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
