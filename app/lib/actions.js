"use server";

import { z } from "zod";
import { mongooseConnect } from "./mongooseConnect";
import { Cat } from "./models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
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

export async function createCat(prevState, formData) {
	const validatedFields = FormSchema.safeParse({
		name: formData.get("name"),
		age: formData.get("age"),
		description: formData.get("description"),
		category: formData.get("category"),
		img: formData.get("img"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing fields. Failed to create cat.",
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
	const { name, age, description, category, img } = FormSchema.parse({
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
