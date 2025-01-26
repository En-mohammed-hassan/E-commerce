import { prisma } from "./db";

export async function getChartData() {
	// Create a map to store totals for each day
	const results = await prisma.$queryRaw`
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
	console.log(results);
	console.log(amounts);
	console.log(dates);

	return { dates, amounts };
}
