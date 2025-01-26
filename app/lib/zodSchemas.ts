import { z } from "zod";
export const productSchema = z.object({
	name: z.string(),
	description: z.string(),
	status: z.enum(["draft", "published", "archived"]),
	images: z.array(z.string()).min(1, "At least one image is  required"),
	price: z.number().min(0),
	isFeatured: z.boolean().optional(),
	category: z.enum(["men", "women", "kids"]),
});

export const bannerSchema = z.object({
	title: z.string(),
	image: z.string(),
});
