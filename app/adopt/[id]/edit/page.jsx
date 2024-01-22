import EditCatForm from "./EditCatForm";
import { getCatById } from "../../../lib/data";
export default async function Page({ params }) {
	const id = params.id;
	const [cat] = await getCatById(id);
	return (
		<div>
			<EditCatForm cat={cat} id={id} />
		</div>
	);
}
