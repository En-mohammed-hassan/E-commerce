"use client";
import Link from "next/link";
import { DashboardLinks } from "@/constant";
import { usePathname } from "next/navigation";

const DashboardNavigation = () => {
	const path = usePathname();
	return (
		<>
			{DashboardLinks.map((link) => (
				<Link
					key={link.path}
					href={link.path}
					className={
						path === link.path
							? "group text-black "
							: "group text-gray-500 hover:text-black "
					}
				>
					{link.name}
					<span className="block max-w-0 group-hover:max-w-full transition-all duration-400 h-1 bg-black"></span>
				</Link>
			))}
		</>
	);
};

export default DashboardNavigation;
