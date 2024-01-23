import { auth } from "../../auth";
import AppNavbar from "./AppNavbar";

export default async function AppNavbarSessionProvider() {
	const session = await auth();
	console.log(session);
	return <AppNavbar session={session} />;
}
