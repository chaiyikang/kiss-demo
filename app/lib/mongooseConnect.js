import mongoose from "mongoose";

const connection = {};

export async function mongooseConnect() {
	try {
		if (connection.isConnected) {
			console.log("Using existing connection");
			return;
		}
		const db = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
		connection.isConnected = db.connections[0].readyState;
	} catch (error) {
		console.log(error);
		throw new Error("error connecting via mongoose");
	}
}
