import Image from "next/image";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

const Landing = () => {
	return (
		<div>
			<span className=" border-t  border-gray-300 w-2/3 h-1 block mx-auto my-6  "></span>
			<h1 className="text-center my-8 text-4xl font-bold text-gray-600">
				Shop BY Category
			</h1>
			<div className="m-3 grid grid-cols-2 grid-rows-2 gap-6 h-[80vh] max-md:flex max-md:flex-col max-md:h-auto">
				<div className="row-span-2 relative p-4 max-md:h-[60vh] h-[80vh] rounded-lg overflow-hidden ">
					<div className=" bg-gradient-to-b from-transparent to-black opacity-45 absolute z-10 top-0 right-0 h-full w-full"></div>
					<Image
						src="/all.jpeg"
						alt="all"
						fill
						className="object-cover object-bottom
				max-md:object-center "
					></Image>
					<div className="text-white absolute bottom-3 left-3 z-20">
						<Link href="/products/all" className="font-bold text-lg">
							All Products
						</Link>{" "}
						<p className="text-sm font-medium">Shop Now</p>
					</div>
				</div>
				<div className=" relative p-4  max-md:h-[50vh]  overflow-hidden rounded-lg ">
					<div className=" bg-gradient-to-b from-transparent to-blackopacity-45 absolute z-10 top-0 right-0 h-full w-full"></div>

					<Image
						src="/men.jpeg"
						alt="all"
						fill
						className="object-cover object-bottom "
					></Image>
					<div className="text-white absolute bottom-3 left-3 z-20">
						<Link href="/products/men" className="font-bold text-lg">
							Products for Men
						</Link>{" "}
						<p className="text-sm font-medium">Shop Now</p>
					</div>
				</div>
				<div className="relative p-4  max-md:h-[50vh]   overflow-hidden rounded-lg  ">
					<div className=" bg-gradient-to-b from-transparent to-black  opacity-45 absolute z-10 top-0 right-0 h-full w-full"></div>

					<Image
						src="/women.jpeg"
						alt="all"
						fill
						className="object-cover object-bottom"
					></Image>
					<div className="text-white absolute bottom-3 left-3 z-20">
						<Link href="/products/women" className="font-bold text-lg">
							Products for Women
						</Link>{" "}
						<p className="text-sm font-medium">Shop Now</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
