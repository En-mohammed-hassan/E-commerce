"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const DeletingButton = ({ text }: { text: string }) => {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button disabled variant="destructive">
					<Loader2 className="animate-spin w-5 h-5"></Loader2>
					loading
				</Button>
			) : (
				<Button type="submit" variant="destructive">
					{text}
				</Button>
			)}
		</>
	);
};

export default DeletingButton;
