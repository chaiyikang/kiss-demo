import { Skeleton } from "@nextui-org/skeleton";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

export default function Loading() {
	return (
		<div className="flex flex-wrap">
			{Array.from({ length: 10 }).map((_, i) => (
				<Card className="basis-1/5 h-[300px] space-y-5 p-4" radius="lg" key={i}>
					{/* text */}
					<div className="space-y-3">
						<Skeleton className="w-3/5 rounded-lg">
							<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
						</Skeleton>
						<Skeleton className="w-4/5 rounded-lg">
							<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
						</Skeleton>
						<Skeleton className="w-2/5 rounded-lg">
							<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
						</Skeleton>
					</div>

					{/* image */}
					<Skeleton className="rounded-lg">
						<div className="h-[270px] rounded-lg bg-default-300"></div>
					</Skeleton>
				</Card>
			))}
		</div>
	);
}
