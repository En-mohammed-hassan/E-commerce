"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = ({ text }: { text: string }) => {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button disabled>
					<Loader2 className="animate-spin w-5 h-5"></Loader2>
					loading
				</Button>
			) : (
				<Button type="submit">{text}</Button>
			)}
		</>
	);
};

export default SubmitButton;
