import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
	return (
		<div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
			<h1 className="text-4xl font-bold tracking-tight">About This Website</h1>

			<Card>
				<CardContent className="pt-6 space-y-4">
					<p className="text-muted-foreground text-base">
						This project is a modern full-stack e-commerce platform designed
						with performance and scalability in mind. It leverages the best
						tools in the React ecosystem for a seamless developer and user
						experience.
					</p>

					<p className="text-base">
						Users can browse products, sign in securely, manage their cart, and
						complete purchases — all through a highly interactive interface.
					</p>
				</CardContent>
			</Card>

			<div>
				<h2 className="text-2xl font-semibold mb-4">🛠️ Built With</h2>
				<ul className="grid grid-cols-2 gap-4 text-sm sm:text-base">
					{[
						"React & Next.js (App Router & Server Actions)",
						"TypeScript",
						"Tailwind CSS",
						"shadcn/ui",
						"Prisma",
						"Zustand",
						"Uploadthing",
						"Vercel hosting",
					].map((tech) => (
						<li
							key={tech}
							className="px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-accent transition"
						>
							{tech}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
