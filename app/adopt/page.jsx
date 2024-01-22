import { Button } from "@nextui-org/button";
import { getCats } from "../lib/data";
import CatCard from "./CatCard";
import Searchbar from "./Searchbar";
import Link from "next/link";

export default async function Page({ searchParams }) {
	const cats = await getCats(searchParams?.catQuery);
	return (
		<>
			<div className="flex justify-between">
				<Searchbar />
				<Button>
					<Link href="/adopt/add">Add a cat</Link>
				</Button>
			</div>
			<div className="flex flex-wrap">
				{cats.map((cat) => (
					<CatCard cat={cat} key={cat._id} />
				))}
			</div>
		</>
	);
}
