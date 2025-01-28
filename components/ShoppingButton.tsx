"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2, ShoppingBagIcon } from "lucide-react";

const ShoppingButton = () => {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button disabled className="w-full">
					<Loader2 className="animate-spin w-5 h-5 "></Loader2>
					loading
				</Button>
			) : (
				<Button type="submit" className="w-full">
					<ShoppingBagIcon></ShoppingBagIcon>
					Add to Cart
				</Button>
			)}
		</>
	);
};

export default ShoppingButton;
