import "@/styles/globals.css";
import Provider from "@/components/Provider";
import Nav from "@/components/Navbar";

export const metadata = {
	title: "E-commerce",
	description: "Online store with admin dashboard",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Provider>
				<body className="">
					<Navbar />
					{children}
				</body>
			</Provider>
		</html>
	);
}
