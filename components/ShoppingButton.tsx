"use client";

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2, ShoppingBagIcon } from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import useCartStore from "@/stores/useCartStore";
import type { Item } from "@/app/lib/types";

const ShoppingButton = ({ cartItem }: { cartItem: Item }) => {
	const { user } = useKindeAuth();
	const { addItem } = useCartStore();
	const [pending, setPending] = useState(false);
	const handleSubmit = () => {
		setPending(true);
		addItem(cartItem);
		setPending(false);
	};

	return (
		<>
			{pending ? (
				<Button disabled className="w-full">
					<Loader2 className="animate-spin w-5 h-5 "></Loader2>
					loading
				</Button>
			) : (
				<Button onClick={handleSubmit} className="w-full">
					<ShoppingBagIcon></ShoppingBagIcon>
					Add to Cart
				</Button>
			)}
		</>
	);
};

export default ShoppingButton;
