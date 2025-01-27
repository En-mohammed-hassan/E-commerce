import { prisma } from "./db";

type ChartDataResult = {
	date: Date; // Assuming the raw query returns Date objects
	totalamount: bigint; // Prisma might return amounts as bigint
}[];

type ChartData = {
	date: string; // Formatted date as a string (e.g., "YYYY-MM-DD")
	sales: number; // Total amount as a number
}[];

export async function getChartData(): Promise<ChartData> {
	// Execute raw SQL query
	const results: ChartDataResult = await prisma.$queryRaw`
    SELECT
      DATE_TRUNC('day', "createdAt") AS date,
      SUM("amount") AS totalamount
    FROM "Order"
    GROUP BY DATE_TRUNC('day', "createdAt")
    ORDER BY DATE_TRUNC('day', "createdAt") ASC;
  `;

	// Map raw query results to the desired format
	const chartData: ChartData = results.map((result) => {
		const date = new Date(result.date).toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
		const sales = Number(result.totalamount) / 100; // Convert bigint to number and divide by 100
		return { date, sales };
	});

	return chartData;
}
