"use server";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { bannerSchema, productSchema } from "../lib/zodSchemas";
import { prisma } from "../lib/db";
import { extractUrls } from "../lib/extractUrls";
import redis from "../lib/redis";
import { revalidatePath } from "next/cache";
import type { Cart } from "../lib/types";
import authinticate from "../lib/authinticate";
import { stripe } from "../lib/stripe";
import type Stripe from "stripe";
import authorizeAdmin from "../lib/authorizeAdmin";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function createProduct(prevState: unknown, formData: FormData) {
	await authorizeAdmin();

	const submission = parseWithZod(formData, {
		schema: productSchema,
	});
	if (submission.status !== "success") {
		return submission.reply();
	}
	const urls = extractUrls(submission.value.images);
	try {
		await prisma.product.create({
			data: {
				name: submission.value.name,
				description: submission.value.description,
				status: submission.value.status,
				price: submission.value.price,
				category: submission.value.category,
				isFeatured: submission.value.isFeatured,
				images: urls,
			},
		});
	} catch (error) {
		console.log(error);
	}

	return redirect("/dashboard/products");
}

export async function updateProduct(prevState: unknown, formData: FormData) {
	await authorizeAdmin();

	const submission = parseWithZod(formData, {
		schema: productSchema,
	});
	if (submission.status !== "success") {
		return submission.reply();
	}
	const urls = extractUrls(submission.value.images);
	try {
		await prisma.product.update({
			where: {
				id: formData.get("productId") as string,
			},
			data: {
				name: submission.value.name,
				description: submission.value.description,
				status: submission.value.status,
				price: submission.value.price,
				category: submission.value.category,
				isFeatured: submission.value.isFeatured,
				images: urls,
			},
		});
	} catch (error) {
		console.log(error);
	}

	return redirect("/dashboard/products");
}

export async function deletProduct(formData: FormData) {
	await authorizeAdmin();

	await prisma.product.delete({
		where: {
			id: formData.get("productId") as string,
		},
	});

	redirect("/dashboard/products");
}

export async function createBanner(prevState: unknown, formData: FormData) {
	await authorizeAdmin();

	const submission = parseWithZod(formData, {
		schema: bannerSchema,
	});
	if (submission.status !== "success") {
		return submission.reply();
	}
	try {
		await prisma.banner.create({
			data: {
				title: submission.value.title,
				image: submission.value.image,
			},
		});
	} catch (error) {
		console.log(error);
	}

	return redirect("/dashboard/banners");
}

export async function deleteBanner(formData: FormData) {
	await authorizeAdmin();

	await prisma.banner.delete({
		where: {
			id: formData.get("bannerId") as string,
		},
	});
	redirect("/dashboard/banners");
}

export async function addItem(formData: FormData) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	if (!user) redirect("/app/api/auth/login");
	const productId = formData.get("productId") as string;
	const selectedProduct = await prisma.product.findUnique({
		where: {
			id: productId,
		},
	});
	if (!selectedProduct) redirect("/");
	const cart: Cart | null = await redis.get(`cart_${user.id}`);

	let MyCart = {};
	if (!cart) {
		MyCart = {
			items: [
				{
					name: selectedProduct.name,
					productId: selectedProduct.id,
					image: selectedProduct.images[0],

					price: selectedProduct.price,
					quantity: 1,
				},
			],
			user_id: user.id,
		};
	} else {
		let isFound = false;
		cart?.items.forEach((e) => {
			if (e.productId === productId) {
				isFound = true;
				e.quantity += 1;
			}
		});
		if (!isFound) {
			cart.items.push({
				name: selectedProduct.name,
				productId: selectedProduct.id,
				image: selectedProduct.images[0],

				price: selectedProduct.price,
				quantity: 1,
			});
		}
		MyCart = cart;
	}
	await redis.set(`cart_${user.id}`, MyCart);
	revalidatePath("/", "layout");
	revalidatePath("/", "page");
}

export async function deletItem(formData: FormData) {
	const user = await authinticate();

	const productId = formData.get("productId");
	const cart: Cart | null = await redis.get(`cart_${user.id}`);

	if (!cart) redirect("/");
	const updatedItems = cart?.items.filter((e) => e.productId !== productId);
	const updatedCart = {
		items: updatedItems,
		user_id: user.id,
	};
	await redis.del(`cart_${user.id}`);
	await redis.set(`cart_${user.id}`, updatedCart);
	revalidatePath("/", "layout");
}

export async function checkOut() {
	const user = await authinticate();
	const cart: Cart | null = await redis.get(`cart_${user?.id}`);
	if (cart && cart.items) {
		const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
			cart.items.map((item) => ({
				price_data: {
					unit_amount: item.price * 100,
					currency: "usd",
					product_data: {
						name: item.name,
						images: [item.image],
					},
				},
				quantity: item.quantity,
			}));
		const session = await stripe.checkout.sessions.create({
			line_items: lineItems,
			mode: "payment",
			cancel_url: "https://e-commerce-alpha-amber-21.vercel.app/payment/cancel",
			success_url:
				"https://e-commerce-alpha-amber-21.vercel.app/payment/success",
			metadata: {
				userId: user.id,
			},
		});

		return redirect(session.url as string);
	}
}
