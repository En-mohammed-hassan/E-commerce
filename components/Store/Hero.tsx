import getabanners from "@/app/lib/getBanners";
import React from "react";
import { Card, CardContent } from "../ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

async function Hero() {
	const data = await getabanners();
	return (
		<div className="m-3">
			<Carousel className="">
				<CarouselContent>
					{data?.map((item) => (
						<CarouselItem key={item.id}>
							<div className=" relative h-[60vh] lg:h-[80vh]">
								<Image
									src={item.image}
									fill
									alt="banner image"
									className="object-cover  rounded-xl "
								></Image>
								<div className="cursor-default p-3 absolute top-8 left-8 bg-black opacity-70 rounded-lg hover:scale-110 hover:opacity-100 transition-all">
									<p className="text-white font-bold text-3xl">{item.title}</p>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="ml-20" />
				<CarouselNext className="mr-20" />
			</Carousel>
		</div>
	);
}

export default Hero;
