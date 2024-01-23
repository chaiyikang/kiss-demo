"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../lib/actions";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import PasswordInput from "../1AppComponents/PasswordInput/PasswordInput";

export default function Page() {
	const [errorMessage, dispatch] = useFormState(authenticate, undefined);

	return (
		<form
			action={dispatch}
			className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
		>
			<Input
				type="email"
				name="email"
				label="Email"
				placeholder="Enter your email"
				variant="bordered"
				className="max-w-xs"
			></Input>
			<PasswordInput />
			<Button type="submit" color="primary" className="mt-4">
				Login
			</Button>
			<div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
				{errorMessage && (
					<>
						<p className="text-sm text-red-500">{errorMessage}</p>
					</>
				)}
			</div>
		</form>
	);
}
