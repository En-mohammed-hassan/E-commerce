"use client";
import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns"; // Adapter for handling date formatting

// Register required components for Chart.js
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeScale
);

export default function LineChart({
	dates,
	amounts,
}: {
	dates: string[];
	amounts: number[];
}) {
	// Sample data with dates and amounts
	const data = {
		labels: dates, // X-axis dates
		datasets: [
			{
				label: "sales",
				data: amounts, // Y-axis amounts
				borderColor: "rgba(75, 192, 192, 1)",
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				borderWidth: 2,
				tension: 0.4, // Makes the line slightly curved
				pointRadius: 5, // Points on the line
			},
		],
	};

	// Chart options
	const options = {
		responsive: true, // Ensures responsiveness
		plugins: {
			legend: {
				position: "top", // Position of the legend
			},
			tooltip: {
				enabled: true, // Enables tooltips
				callbacks: {
					label: (context) => `sales: $${context.raw}`, // Customizes tooltip text
				},
			},
		},
		scales: {
			x: {
				type: "time", // Specifies that the x-axis is time-based
				time: {
					unit: "day", // Adjusts how dates are displayed (e.g., month, week, day)
				},
				title: {
					display: true,
					text: "Date", // X-axis title
				},
			},
			y: {
				title: {
					display: true,
					text: "sales ($)", // Y-axis title
				},
				beginAtZero: true, // Starts y-axis at 0
			},
		},
	};

	return (
		<div style={{ width: "100%", height: "400px" }}>
			<Line data={data} options={options} />
		</div>
	);
}
