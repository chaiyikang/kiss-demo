import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { createCat } from "../../lib/actions";

export default function AddCatForm() {
	return (
		<form action={createCat}>
			<Input name="name" label="Name" />
			<Input name="age" label="Age" />
			<Input name="description" label="Desciption" />
			<Input name="category" label="Category" />
			<Input name="img" label="Image Link" />
			<Button color="primary" type="submit">
				Add
			</Button>
		</form>
	);
}
