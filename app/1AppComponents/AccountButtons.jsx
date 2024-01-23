import { signOutAction } from "../lib/actions";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

export default async function AccountButtons() {
	return (
		<NavbarContent justify="end">
			<NavbarItem className="hidden lg:flex">
				<Link href="/login">Login</Link>
			</NavbarItem>
			<NavbarItem>
				<Button as={Link} color="primary" href="/register" variant="flat">
					Sign Up
				</Button>
			</NavbarItem>
			<NavbarItem>
				<form action={signOutAction}>
					<Button type="submit" color="primary" variant="flat">
						Log Out
					</Button>
				</form>
			</NavbarItem>
		</NavbarContent>
	);
}
