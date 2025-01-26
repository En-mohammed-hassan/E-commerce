"use client";

import { createBanner } from "@/app/actions/actions";
import { UploadDropzone } from "@/app/lib/uploadthing";
import SubmitButton from "@/components/SubmitButton";
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
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { bannerSchema } from "@/app/lib/zodSchemas";

const Page = () => {
	const [image, setImage] = useState("");
	const [lastResult, action] = useActionState(createBanner, undefined);

	const [form, fields] = useForm({
		lastResult,

		onValidate({ formData }) {
			return parseWithZod(formData, { schema: bannerSchema });
		},

		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	});

	return (
		<>
			<div className="flex justify-between mb-4">
				<Button asChild variant="outline">
					<Link href="/dashboard/banners">
						<ChevronLeft className="w-4 h-4" />
					</Link>
				</Button>

				<h1 className="text-xl font-bold">New Banner</h1>
			</div>
			<Card>
				<form id={form.id} onSubmit={form.onSubmit} action={action}>
					<CardHeader>
						<CardTitle>Banner details</CardTitle>
						<CardDescription>
							In this form you can create your Banner
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-6">
							<div className="flex flex-col gap-3">
								<Label>Title</Label>

								<Input
									type="text"
									placeholder="inter you title"
									key={fields.title.key}
									name={fields.title.name}
									defaultValue={fields.title.initialValue}
								></Input>
								<p className="text-red-500">{fields.title.errors}</p>
							</div>

							<div className="flex flex-col gap-3">
								<Label>Image</Label>

								<Input
									type="hidden"
									value={image}
									key={fields.image.key}
									name={fields.image.name}
								></Input>
								{image.length > 0 ? (
									<div className="relative w-[100px] h-[100px]">
										<Image
											height={100}
											width={100}
											src={image}
											alt="Product Image"
											className="w-full h-full object-cover rounded-lg border"
										/>

										<button
											onClick={() => {
												setImage("");
											}}
											type="button"
											className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
										>
											<XIcon className="w-3 h-3" />
										</button>
									</div>
								) : (
									<>
										<UploadDropzone
											endpoint="imageUploader2"
											onClientUploadComplete={(res) => {
												setImage(res[0].url);
											}}
											onUploadError={() => {
												alert("the image not uploaded");
											}}
										/>
									</>
								)}
							</div>
							<p className="text-red-500">{fields.image.errors}</p>
						</div>
					</CardContent>

					<CardFooter>
						<SubmitButton text="Add Banner"></SubmitButton>
					</CardFooter>
				</form>
			</Card>
		</>
	);
};

export default Page;
