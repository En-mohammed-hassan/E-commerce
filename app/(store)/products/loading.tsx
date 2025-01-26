import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
	return (
		<div>
			<Skeleton className="h-10 w-28  mb-10  "></Skeleton>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
				<Skeleton className="h-[50vh] w-full"></Skeleton>
				<Skeleton className="h-[50vh] w-full"></Skeleton>
				<Skeleton className="h-[50vh] w-full"></Skeleton>
				<Skeleton className="h-[50vh] w-full"></Skeleton>
				<Skeleton className="h-[50vh] w-full"></Skeleton>
				<Skeleton className="h-[50vh] w-full"></Skeleton>
				<Skeleton className="h-[50vh] w-full"></Skeleton>
				<Skeleton className="h-[50vh] w-full"></Skeleton>
			</div>
		</div>
	);
};

export default loading;
