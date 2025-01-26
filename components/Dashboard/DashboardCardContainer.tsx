import { getDashboardData } from "@/app/lib/getDashboardData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, User } from "lucide-react";

const DashboardCardContainer = async () => {
	const { productsCount, ordersCount, usersCount, totalSales } =
		await getDashboardData();
	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
			<Card>
				<CardHeader className="pb-2 flex justify-between items-center flex-row ">
					<CardTitle className="text-2xl">Total Revenue</CardTitle>
					<DollarSign className="text-green-900 h-4 w-4"> </DollarSign>
				</CardHeader>
				<CardContent>
					<p className=" text-2xl font-bold ">
						${new Intl.NumberFormat("en-us").format(totalSales / 100)}
					</p>
					<p className="text-xs text-gray-500">Based on {ordersCount} chargs</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2 flex justify-between items-center flex-row ">
					<CardTitle className="text-2xl">Total Sales</CardTitle>
					<ShoppingBag className="text-blue-700 h-4 w-4"> </ShoppingBag>
				</CardHeader>
				<CardContent>
					<p className=" text-2xl font-bold ">+{ordersCount}</p>
					<p className="text-xs text-gray-500">Total sales in our shop</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2 flex justify-between items-center flex-row ">
					<CardTitle className="text-2xl text-nowrap truncate ">
						Total Products
					</CardTitle>
					<PartyPopper className="text-blue-900 h-4 w-4 "> </PartyPopper>
				</CardHeader>
				<CardContent>
					<p className=" text-2xl font-bold ">{productsCount}</p>
					<p className="text-xs text-gray-500">Total products created</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2 flex justify-between items-center flex-row ">
					<CardTitle className="text-2xl">Total Users</CardTitle>
					<User className="text-red-700 h-4 w-4"> </User>
				</CardHeader>
				<CardContent>
					<p className=" text-2xl font-bold ">{usersCount}</p>
					<p className="text-xs text-gray-500">Total users signed up</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default DashboardCardContainer;
