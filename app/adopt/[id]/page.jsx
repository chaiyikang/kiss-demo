import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { getCatById } from "../../lib/data";
import DeleteButton from "./DeleteButton";
import { notFound } from "next/navigation";
//
export default async function Page({ params }) {
	const id = params.id;
	const [cat] = await getCatById(id);

	if (!cat) notFound();

	return (
		<div>
			<div className="flex">
				<Button color="primary">
					<Link href={`/adopt/${id}/edit`}>Edit Info</Link>
				</Button>
				<DeleteButton id={id} name={cat.name} />
			</div>
			<h1>{cat.name}</h1>
			<Image
				alt="Card background"
				className="object-cover rounded-xl"
				src={cat.img}
				width={270}
				height={270}
			/>
			<p>Age: {cat.age}</p>
			<p>About {cat.name}:</p>
			<p />
			<p>{cat.description}</p>
		</div>
	);
}
