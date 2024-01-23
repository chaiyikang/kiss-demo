import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { mongooseConnect } from "./app/lib/mongooseConnect";
import { User } from "./app/lib/models";

async function getUser(email) {
	try {
		// mongooseConnect();
		const user = await User.findOne({ email });
		return user;
	} catch (error) {
		console.error("Failed to fetch user", error);
		throw new Error("Failed to fetch user");
	}
}

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				// validate inputs
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(6) })
					.safeParse(credentials);

				if (!parsedCredentials.success) return null;

				// check if user exists in db
				const { email, password } = parsedCredentials.data;
				const user = await getUser(email);
				if (!user) return null;

				// check password
				const correctPassword = await bcrypt.compare(password, user.password);
				console.log("🚀 ~ authorize ~ user:", user);

				if (correctPassword) {
					console.log("logged in");
					return user;
				}
				console.log("password wrong");
				return null;
			},
		}),
	],
});
