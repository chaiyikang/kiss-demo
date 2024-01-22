import { Cat, User } from "./models";
import { mongooseConnect } from "./mongooseConnect";

export async function getUsers() {
	try {
		mongooseConnect();
		const users = await User.find();
		return users;
	} catch (error) {
		console.log("Error getting users");
		throw new Error("Error getting users");
	}
}

export async function getCats(query) {
	try {
		mongooseConnect();
		// await new Promise((resolve) => setTimeout(resolve, 5000));
		if (!query) {
			return await Cat.find();
		} else {
			const regex = new RegExp(`^${query}`, "i");
			return await Cat.find({ name: regex });
		}
	} catch (error) {
		console.log("Error getting cats");
		throw new Error("Error getting cats");
	}
}

export async function getCatById(id) {
	try {
		mongooseConnect();
		return await Cat.find({ _id: id });
	} catch (error) {
		console.log("Error getting cat");
		throw new Error("Error getting cat");
	}
}


