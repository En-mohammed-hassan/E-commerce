import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import getOrders from "@/app/lib/getOrders";
import TransactionChart from "../TransactionChart";
import { getChartData } from "@/app/lib/getChartData";
import Image from "next/image";

const DashboardHero = async () => {
	const orders = await getOrders();
	const  chartData  = await getChartData();
	return (
		<div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 mt-10">
			<Card className="xl:col-span-2">
				<CardHeader className=" ">
					<CardTitle className="text-2xl">Transactions</CardTitle>
					<CardDescription>
						<TransactionChart data={chartData}></TransactionChart>
					</CardDescription>
				</CardHeader>
				<CardContent></CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2 flex justify-between items-center flex-row ">
					<CardTitle className="text-2xl">Total Sales</CardTitle>
				</CardHeader>
				<CardContent>
					{orders?.map((order) => (
						<div key={order.id} className="flex items-center mb-6">
							<Image
								src={
									order.User?.profileImage ??
									"https://avatar.vercel.sh/rauchg.svg?text=U"
								}
								alt="profile"
								width={33}
								height={33}
								className="rounded-full"
							></Image>

							<div className="ml-3">
								<p className="text-sm font-medium ">{order.User?.firstName} </p>
								<p className="text-sm font-medium text-gray-500">
									{order.User?.email}
								</p>
							</div>
							<p className="ml-auto font-semibold">
								${new Intl.NumberFormat("en-us").format(order.amount / 100)}
							</p>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
};

export default DashboardHero;
