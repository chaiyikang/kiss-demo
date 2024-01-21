import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

function CatCard({ cat }) {
	return (
		<Card isPressable className="py-4 basis-1/5">
			<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
				<h1>{cat.name}</h1>
			</CardHeader>
			<CardBody className="overflow-visible py-2">
				<Image
					alt="Card background"
					className="object-cover rounded-xl"
					src={cat.img}
					width={270}
					height={270}
				/>
			</CardBody>
		</Card>
	);
}

export default CatCard;
