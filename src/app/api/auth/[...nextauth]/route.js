import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { connecToDb } from "@/libs/connectDataBase";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async signIn({ profile }) {
			try {
				await connecToDb();

				const user = await User.findOne({ email: profile.email });

				if (!user) {
					await User.create({
						email: profile.email,
						username: profile.name?.replace(" ", "").toLowerCase() || "guest",
						image: profile.picture || "",
					});
				}

				return true;
			} catch (error) {
				console.error("Error in signIn callback:", error);
				return false;
			}
		},
		async session({ session }) {
			try {
				const sessionUser = await User.findOne({ email: session.user.email });

				if (sessionUser) {
					session.user.id = sessionUser._id.toString();
				}
				return session;
			} catch (error) {
				console.error("Error in session callback:", error);
				return session;
			}
		},
	},
});

export { handler as GET, handler as POST };
