"use client";

import { useEffect } from "react";
import { Button } from "@nextui-org/button";

export default function Error({ error, reset }) {
	useEffect(() => {
		// Optionally log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<main className="flex h-full flex-col items-center justify-center">
			<h2 className="text-center">
				Meow. Something went wrong trying to fetch the data of all our cats!
			</h2>
			<Button
				color="primary"
				onClick={
					// Attempt to recover by trying to re-render the invoices route
					() => reset()
				}
			>
				Try again
			</Button>
		</main>
	);
}