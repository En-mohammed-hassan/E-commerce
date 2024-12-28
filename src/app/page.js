"use client";
import { useState, useEffect } from "react";
import {
	signIn,
	signOut,
	getProviders,
	useSession,
	getSession,
} from "next-auth/react";
import Image from "next/image";

export default function Home() {
	const [providers, setProviders] = useState(null);

	useEffect(() => {
		const fetchProviders = async () => {
			const response = await getProviders();
			setProviders(response);
			console.log(response);
		};
		fetchProviders();
	}, []);
	return (
		<div className="">
			{providers &&
				Object.values(providers).map((provider) => (
					<button
						className="black_btn"
						type="button"
						key={provider.name}
						onClick={() => {
							signIn(provider.id);
						}}
					>
						Sign In with {provider.name}
					</button>
				))}{" "}
		</div>
	);
}
