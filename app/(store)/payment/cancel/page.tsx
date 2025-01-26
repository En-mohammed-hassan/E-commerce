import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const cancel = () => {
	return (
		<section className="h-[80vh] w-full flex justify-center items-center">
			<Card className="w-80">
				<div className="flex items-center p-6 flex-col">
					<XCircle className="mb-3 p-2 h-12 w-12 bg-red-600/20 text-red-700 rounded-full"></XCircle>
					<h1 className="mb-3 text-xl font-bold ">Payment Cancelled</h1>
					<p className=" mb-3 text-gray-500 text-sm font-medium text-center">
						Some thing went wrong with your payment . You havent been charged .
						Please try again
					</p>
					<Button asChild className="p-6 w-full">
						<Link href="/">Go to HomePage</Link>
					</Button>
				</div>
			</Card>
		</section>
	);
};

export default cancel;
