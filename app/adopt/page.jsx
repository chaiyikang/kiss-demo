import { getCats } from "../lib/data";
import CatCard from "./CatCard";
import Searchbar from "./Searchbar";

export default async function Page({ searchParams }) {
	const cats = await getCats(searchParams?.catQuery);
	console.log(searchParams);
	return (
		<>
			<Searchbar />
			<div className="flex flex-wrap">
				{cats.map((cat) => (
					<CatCard cat={cat} key={cat._id} />
				))}
			</div>
		</>
	);
}
