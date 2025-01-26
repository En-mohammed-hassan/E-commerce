import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const Success = () => {
	return (
		<section className="h-[80vh] w-full flex justify-center items-center">
			<Card className="w-80">
				<div className="flex items-center p-6 flex-col">
					<Check className=" mb-3 border border-green-600  h-12 w-12 bg-green-600/20 text-green-700 rounded-full"></Check>
					<h1 className="mb-3 text-xl font-bold ">Payment Successfull</h1>
					<p className=" mb-3 text-gray-500 text-sm font-medium text-center">
						Congrats you completed you purchase . We hope you enjoy your product
					</p>
					<Button asChild className="p-6 w-full">
						<Link href="/">Go to HomePage</Link>
					</Button>
				</div>
			</Card>
		</section>
	);
};

export default Success;
