"use client";
import { useFormState } from "react-dom";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { createUser } from "../lib/actions";
import PasswordInput from "../1AppComponents/PasswordInput/PasswordInput";
import PasswordInputAgain from "../1AppComponents/PasswordInput/PasswordInputAgain";

export default function RegisterForm() {
	const initialState = { message: null, errors: {} };
	const [state, dispatch] = useFormState(createUser, initialState);
	console.log("🚀 ~ RegisterForm ~ state:", state);
	return (
		<form
			className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			action={dispatch}
		>
			<Input
				name="email"
				isInvalid={state.errors?.email}
				errorMessage={state.errors?.email && state.errors.email.join(" ")}
				type="email"
				label="Email"
				className="max-w-xs mt-4"
				variant="bordered"
				placeholder="Enter your email"
			/>
			<PasswordInput
				isInvalid={state.errors?.password}
				errorMessage={state.errors?.password && state.errors.password.join(" ")}
			/>
			<PasswordInputAgain
				isInvalid={state.errors?.passwordAgain}
				errorMessage={state.errors?.passwordAgain && state.errors.passwordAgain.join(" ")}
			/>
			<Button color="primary" className="mt-4" type="submit">
				Register Account
			</Button>
			<div id="customer-error" aria-live="polite" aria-atomic="true">
				{state.message && <p className="mt-2 text-sm text-red-500">{state.message}</p>}
			</div>
		</form>
	);
}
