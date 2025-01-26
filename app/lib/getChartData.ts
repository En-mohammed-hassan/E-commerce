import { prisma } from "./db";

type ChartDataResult = {
	date: Date; // Adjust to `string` if `date` is returned as a string
	totalamount: number;
}[];

export async function getChartData() {
	// Create a map to store totals for each day
	const results: ChartDataResult = await prisma.$queryRaw`
    SELECT
      DATE_TRUNC('day', "createdAt") AS date,
      SUM("amount") AS totalamount
    FROM "Order"
    GROUP BY DATE_TRUNC('day', "createdAt")
    ORDER BY DATE_TRUNC('day', "createdAt") ASC;
  `;

	const dates = results.map((result) => {
		// Assuming result.date is already a Date object from Prisma
		const date = new Date(result.date);
		return date.toISOString().split("T")[0]; // Formats as "YYYY-MM-DD"
	});

	const amounts = results.map((result) => Number(result.totalamount) / 100);

	return { dates, amounts };
}
