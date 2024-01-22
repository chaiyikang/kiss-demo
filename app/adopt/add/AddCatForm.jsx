"use client";
import { useFormState } from "react-dom";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { createCat } from "../../lib/actions";

export default function AddCatForm() {
	const initialState = { message: null, errors: {} };
	const [state, dispatch] = useFormState(createCat, initialState);
	return (
		<form action={dispatch}>
			<Input
				isInvalid={state.errors?.name}
				errorMessage={state.errors?.name && state.errors.name.join(" ")}
				name="name"
				label="Name"
			/>
			<Input
				isInvalid={state.errors?.age}
				errorMessage={state.errors?.age && state.errors.age.join(" ")}
				name="age"
				label="Age"
			/>
			<Input
				isInvalid={state.errors?.description}
				errorMessage={state.errors?.description && state.errors.description.join(" ")}
				name="description"
				label="Desciption"
			/>
			<Input
				isInvalid={state.errors?.category}
				errorMessage={state.errors?.category && state.errors.category.join(" ")}
				name="category"
				label="Category"
			/>
			<Input
				isInvalid={state.errors?.img}
				errorMessage={state.errors?.img && state.errors.img.join(" ")}
				name="img"
				label="Image Link"
			/>
			<Button color="primary" type="submit">
				Add
			</Button>
			<div id="customer-error" aria-live="polite" aria-atomic="true">
				{state.message && <p className="mt-2 text-sm text-red-500">{state.message}</p>}
			</div>
		</form>
	);
}
