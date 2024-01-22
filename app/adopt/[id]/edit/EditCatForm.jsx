import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { createCat, updateCat } from "../../../lib/actions";

export default function EditCatForm({ cat, id }) {
    const updateCatWithId = updateCat.bind(null, id)
	return (
		<form action={updateCatWithId}>
			<Input defaultValue={cat.name} name="name" label="Name" />
			<Input defaultValue={cat.age} name="age" label="Age" />
			<Input defaultValue={cat.description} name="description" label="Desciption" />
			<Input defaultValue={cat.category} name="category" label="Category" />
			<Input defaultValue={cat.img} name="img" label="Image Link" />
			<Button color="primary" type="submit">
				Save
			</Button>
		</form>
	);
}
