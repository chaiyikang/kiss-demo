import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
	{
		// username: {
		// 	type: String,
		// 	required: true,
		// 	unique: true,
		// 	min: 3,
		// 	max: 20,
		// },
		email: {
			type: String,
			required: true,
			unique: true,
			max: 50,
		},
		password: {
			type: String,
			required: true,
			min: 6,
		},
		// img: {
		// 	type: String,
		// },
		// isAdmin: {
		// 	type: Boolean,
		// 	default: false,
		// },
	},
	{ timestamps: true }
);

const catSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 3,
	},
	category: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
	},
	description: {
		type: String,
	},
	img: {
		type: String,
	},
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Cat = mongoose.models.Cat || mongoose.model("Cat", catSchema);
