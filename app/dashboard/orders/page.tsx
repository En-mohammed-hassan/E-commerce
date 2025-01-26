import getOrders from "@/app/lib/getOrders";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default async function OrdersPage() {
	const orders = await getOrders();
	return (
		<Card>
			<CardHeader className="px-7">
				<CardTitle>Orders</CardTitle>
				<CardDescription>Recent orders from your store!</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Customer</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Date</TableHead>
							<TableHead className="text-right">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders?.map((order) => (
							<TableRow key={order.id}>
								<TableCell>
									<p className="font-medium">{order?.User?.firstName} </p>
									<p className="hidden md:flex text-sm text-gray-500">
										{order?.User?.email}
									</p>
								</TableCell>
								<TableCell>Order</TableCell>
								<TableCell>{order?.status}</TableCell>
								<TableCell>
									{new Intl.DateTimeFormat("en-US").format(order.createdAt)}
								</TableCell>
								<TableCell className="text-right">
									$ ${new Intl.NumberFormat("en-us").format(order.amount / 100)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
