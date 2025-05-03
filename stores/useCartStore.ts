import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cart, Item } from "@/app/lib/types";

interface CartState {
	cart: Cart;
	addItem: (item: Item) => void;
	removeItem: (productId: string) => void;
	clearCart: () => void;
}

const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			cart: {
				items: [],
				user_id: "",
			},
			addItem: (item) => {
				const exists = get().cart.items.find(
					(i) => i.productId === item.productId
				);
				if (exists) {
					set({
						cart: {
							items: get().cart.items.map((i) =>
								i.productId === item.productId
									? { ...i, quantity: i.quantity + item.quantity }
									: i
							),
							user_id: get().cart.user_id,
						},
					});
				} else {
					set({
						cart: {
							items: [...get().cart.items, item],
							user_id: get().cart.user_id,
						},
					});
				}
			},
			removeItem: (productId) => {
				set({
					cart: {
						items: get().cart.items.filter((i) => i.productId !== productId),
						user_id: get().cart.user_id,
					},
				});
			},
			clearCart: () => set({ cart: { items: [], user_id: "" } }),
		}),
		{ name: "cart-storage" }
	)
);

export default useCartStore;
