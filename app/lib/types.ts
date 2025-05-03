export type Cart = {
	items: Item[];
	user_id: string;
};
export type Item = {
	name: string;
	productId: string;
	image: string;
	price: number;
	quantity: number;
};
