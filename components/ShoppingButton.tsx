"use client";

import React, { useState } from "react";
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
		if (!user) {
			window.location.href = "/api/auth/login";

			// Redirect to Kinde login
			return;
		}

		setPending(true);
		addItem(cartItem);
		setPending(false);
	};

	return (
		<>
			{pending ? (
				<Button disabled className="w-full">
					<Loader2 className="animate-spin w-5 h-5" />
					loading
				</Button>
			) : (
				<Button onClick={handleSubmit} className="w-full">
					<ShoppingBagIcon />
					Add to Cart
				</Button>
			)}
		</>
	);
};

export default ShoppingButton;
