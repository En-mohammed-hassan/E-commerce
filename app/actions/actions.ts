"use server";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { bannerSchema, productSchema } from "../lib/zodSchemas";
import { prisma } from "../lib/db";
import { extractUrls } from "../lib/extractUrls";
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

export async function checkOut(cart: Cart) {
	try {
		const user = await authinticate();
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
				cancel_url: process.env.KINDE_SITE_URL + "/payment/cancel",
				success_url: process.env.KINDE_SITE_URL + "/payment/success",
				metadata: {
					userId: user.id,
				},
			});

			return session.url;
		}
	} catch (error: unknown) {
		console.log(error);
		return redirect("/");
	}
}
