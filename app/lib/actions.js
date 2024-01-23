"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { mongooseConnect } from "./mongooseConnect";
import { Cat, User } from "./models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from "../../auth";
import { AuthError } from "next-auth";

const CatFormSchema = z.object({
	name: z
		.string({
			invalid_type_error: "Name must be text.",
		})
		.min(3, { message: "Name must be at least 3 characters long." }),
	age: z.coerce
		.number({ invalid_type_error: "Age must be a number" })
		.gt(0, { message: "Please enter an age greater than 0." }),
	category: z
		.string({
			invalid_type_error: "Category must be text.",
		})
		.min(1, { message: "Please enter a category" }),
	description: z
		.string({
			invalid_type_error: "Description must be text.",
		})
		.min(1, { message: "Please enter a description" }),
	img: z
		.string({
			invalid_type_error: "Link must be text.",
		})
		.min(1, { message: "Please enter the link" }),
});

const UserFormSchema = z.object({
	email: z
		.string({
			invalid_type_error: "Email must be text.",
		})
		.email({ message: "Invalid email address" }),
	password: z
		.string({
			invalid_type_error: "Password must be text.",
		})
		.min(6, { message: "Password must be at least 6 characters long." }),
	passwordAgain: z
		.string({
			invalid_type_error: "Password must be text.",
		})
		.min(6, { message: "Password must be at least 6 characters long." }),
});

export async function signOutAction() {
	try {
		await signOut();
	} catch (error) {
		if (error.message.includes("NEXT_REDIRECT")) {
			console.log("redirecting...");
			throw error;
		} else console.error(error);
	}
	console.log("logged out");
}

export async function authenticate(prevState, formData) {
	try {
		await signIn("credentials", formData);
	} catch (error) {
		// for auth errors, return message instead of throwing error
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return "Invalid credentials.";
				default:
					return "Something went wrong.";
			}
		}
		throw error;
	}
}

export async function createUser(prevState, formData) {
	const validatedFields = UserFormSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
		passwordAgain: formData.get("passwordAgain"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing fields. Failed to create user.",
		};
	}
	const { email, password, passwordAgain } = validatedFields.data;

	const user = await User.findOne({ email });
	if (user)
		return {
			message: "A user with that email already exists.",
		};

	if (!(password === passwordAgain)) {
		return {
			message: "Passwords do not match.",
		};
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		mongooseConnect();
		const newUser = new User({ email, password: hashedPassword });
		await newUser.save();
		console.log("user created");
	} catch (error) {
		console.log("error creating adding new user", error);
		return { message: "Error adding new user" };
	}
	revalidatePath("/admin");
	redirect("/admin");
}

export async function createCat(prevState, formData) {
	const validatedFields = CatFormSchema.safeParse({
		name: formData.get("name"),
		age: formData.get("age"),
		description: formData.get("description"),
		category: formData.get("category"),
		img: formData.get("img"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing fields. Failed to create user.",
		};
	}

	const { name, age, description, category, img } = validatedFields.data;
	try {
		mongooseConnect();
		const newCat = new Cat({ name, age, description, category, img });
		await newCat.save();
	} catch (error) {
		console.log("error creating adding new cat");
		return { error: "Error adding new cat" };
	}
	revalidatePath("/adopt");
	redirect("/adopt");
}

// id needs to be bound
export async function updateCat(id, formData) {
	const { name, age, description, category, img } = CatFormSchema.parse({
		name: formData.get("name"),
		age: formData.get("age"),
		description: formData.get("description"),
		category: formData.get("category"),
		img: formData.get("img"),
	});
	try {
		mongooseConnect();
		await Cat.findByIdAndUpdate(id, { name, age, description, category, img });
	} catch (error) {
		console.log("error updating cat");
		return { error: "Error updating cat" };
	}
	revalidatePath("/adopt");
	redirect("/adopt");
}

export async function deleteCat(id) {
	// throw new Error("fake error");
	try {
		mongooseConnect();
		await Cat.findByIdAndDelete(id);
	} catch (error) {
		console.log("error deleting cat");
		return { error: "Error deleting cat" };
	}
	revalidatePath("/adopt");
	redirect("/adopt");
}
