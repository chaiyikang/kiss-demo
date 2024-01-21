import { getUsers } from "./lib/data";

export default async function Home() {
	const users = await getUsers();
	const user = users[0];
	console.log(user);

	return (
		<>
			<div className="h-[100rem] bg-red-400">
				<p>{user.username}</p>
			</div>
		</>
	);
}
