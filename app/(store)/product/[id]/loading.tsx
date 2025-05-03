import { Skeleton } from "@/components/ui/skeleton";

export default function Component() {
	return (
		<div className="grid sm:grid-cols-2 gap-4">
			<Skeleton className="h-[80vh]"></Skeleton>
			<div>
				<Skeleton className="h-10 mb-2"></Skeleton>
				<Skeleton className="h-48 mb-2"></Skeleton>

				<Skeleton className="h-8"></Skeleton>
			</div>
		</div>
	);
}
