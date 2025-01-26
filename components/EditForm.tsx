"use client";

import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { useActionState, useState } from "react";

import Image from "next/image";
import { updateProduct } from "@/app/actions/actions";
import { categories } from "@/constant/index";
import SubmitButton from "@/components/SubmitButton";
import type { $Enums } from "@prisma/client";
interface product {
	id: string;
	name: string;
	description: string;
	status: $Enums.ProductStatus;
	images: string[];
	price: number;
	category: $Enums.Category;
	isFeatured: boolean;
	createdAt: Date;
}

export default function EditForm({ product }: { product: product }) {
	const [images, setImages] = useState<string[]>(product.images);
	const [lastResult, action] = useActionState(updateProduct, undefined);
	const [form, fields] = useForm({
		lastResult,

		onValidate({ formData }) {
			return parseWithZod(formData, { schema: productSchema });
		},

		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	});

	const handleDelete = (index: number) => {
		setImages(images?.filter((_, i) => i !== index));
	};

	return (
		<form id={form.id} onSubmit={form.onSubmit} action={action}>
			<input hidden name="productId" value={product.id} readOnly></input>
			<div className="flex items-center gap-4 justify-between">
				<Button variant="outline" size="icon" asChild>
					<Link href="/dashboard/products">
						<ChevronLeft className="w-4 h-4" />
					</Link>
				</Button>
				<h1 className="text-xl font-semibold tracking-tight ">
					Update Product
				</h1>
			</div>

			<Card className="mt-5">
				<CardHeader>
					<CardTitle>Product Details</CardTitle>
					<CardDescription>
						In this form you can update your product
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-3">
							<Label>Name</Label>
							<Input
								type="text"
								key={fields.name.key}
								name={fields.name.name}
								defaultValue={product?.name}
								className="w-full"
								placeholder="Product Name"
							/>

							<p className="text-red-500">{fields.name.errors}</p>
						</div>

						<div className="flex flex-col gap-3">
							<Label>Description</Label>
							<Textarea
								key={fields.description.key}
								name={fields.description.name}
								defaultValue={product?.description}
								placeholder="Write your description right here..."
							/>
							<p className="text-red-500">{fields.description.errors}</p>
						</div>
						<div className="flex flex-col gap-3">
							<Label>Price</Label>
							<Input
								key={fields.price.key}
								name={fields.price.name}
								defaultValue={product?.price}
								type="number"
								placeholder="$55"
							/>
							<p className="text-red-500">{fields.price.errors}</p>
						</div>

						<div className="flex flex-col gap-3">
							<Label>Featured Product</Label>
							<Switch
								key={fields.isFeatured.key}
								name={fields.isFeatured.name}
								defaultChecked={product?.isFeatured}
							/>
							<p className="text-red-500">{fields.isFeatured.errors}</p>
						</div>

						<div className="flex flex-col gap-3">
							<Label>Status</Label>
							<Select
								key={fields.status.key}
								name={fields.status.name}
								defaultValue={product?.status}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="draft">Draft</SelectItem>
									<SelectItem value="published">Published</SelectItem>
									<SelectItem value="archived">Archived</SelectItem>
								</SelectContent>
							</Select>
							<p className="text-red-500">{fields.status.errors}</p>
						</div>

						<div className="flex flex-col gap-3">
							<Label>Category</Label>
							<Select
								key={fields.category.key}
								name={fields.category.name}
								defaultValue={product?.category}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select Category" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem key={category.id} value={category.name}>
											{category.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<p className="text-red-500">{fields.category.errors}</p>
						</div>

						<div className="flex flex-col gap-3">
							<Label>Images</Label>
							<input
								type="hidden"
								value={images}
								key={fields.images.key}
								name={fields.images.name}
							/>
							{(images?.length || 0) > 0 ? (
								<div className="flex gap-5">
									{images?.map((image, index) => (
										<div key={index} className="relative w-[100px] h-[100px]">
											<Image
												height={100}
												width={100}
												src={image}
												alt="Product Image"
												className="w-full h-full object-cover rounded-lg border"
											/>

											<button
												onClick={() => handleDelete(index)}
												type="button"
												className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
											>
												<XIcon className="w-3 h-3" />
											</button>
										</div>
									))}
								</div>
							) : (
								<UploadDropzone
									endpoint="imageUploader"
									onClientUploadComplete={(res) => {
										setImages(res.map((r) => r.url));
									}}
									onUploadError={() => {
										alert("Something went wrong");
									}}
								/>
							)}

							<p className="text-red-500">{fields.images.errors}</p>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<SubmitButton text="Update product"></SubmitButton>
				</CardFooter>
			</Card>
		</form>
	);
}