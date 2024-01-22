"use server";

import { z } from "zod";
import { mongooseConnect } from "./mongooseConnect";
import { Cat } from "./models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
	name: z.string(),
	age: z.coerce.number(),
	category: z.string(),
	description: z.string(),
	img: z.string(),
});

export async function createCat(formData) {
	const { name, age, description, category, img } = FormSchema.parse({
		name: formData.get("name"),
		age: formData.get("age"),
		description: formData.get("description"),
		category: formData.get("category"),
		img: formData.get("img"),
	});

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
