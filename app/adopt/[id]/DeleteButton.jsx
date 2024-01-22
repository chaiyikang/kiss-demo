"use client";
import { Button } from "@nextui-org/button";
import { deleteCat } from "../../lib/actions";
export default function DeleteButton({ id, name }) {
	const deleteCatWithId = deleteCat.bind(null, id, name);

	function onSubmit() {
		if (
			!confirm(
				`Are you sure you want to permanently remove ${name} from the database? This action is irreversible.`
			)
		)
			return;
		deleteCatWithId();
	}
	return (
		<form action={onSubmit}>
			<Button type="submit" color="danger">
				Delete
			</Button>
		</form>
	);
}
