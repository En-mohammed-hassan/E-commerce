export type Cart = {
	items: [
		{
			name: string;
			productId: string;
			image: string;
			price: number;
			quantity: number;
		}
	];
	user_id: string;
};
