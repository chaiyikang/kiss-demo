"use client";

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

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AppNavbar() {
	const pathname = usePathname();
	const links = [
		{ name: "Home", href: "/" },
		{ name: "About Us", href: "/about-us" },
		{ name: "Donate", href: "/donate" },
		{ name: "Adopt", href: "/adopt" },
		{ name: "Volunteer", href: "/volunteer" },
		{ name: "Shop", href: "/shop" },
		{ name: "FAQ", href: "/faq" },
		{ name: "Book A Visit", href: "/book-a-visit" },
	];

	return (
		<Navbar>
			{/* logo */}
			<NavbarBrand>
				<Image
					height={80}
					width={189}
					alt="Kitten Sanctuary Logo"
					src="/LOGOlandscape.png"
				/>
			</NavbarBrand>

			{/* nav links */}
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{links.map((link) => (
					<NavbarItem>
						<Link
							color={pathname === link.href ? "" : "foreground"}
							href={link.href}
							aria-current={pathname === link.href ? "page" : "false"}
						>
							{link.name}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>

			{/* login */}
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<Link href="#">Login</Link>
				</NavbarItem>
				<NavbarItem>
					<Button as={Link} color="primary" href="#" variant="flat">
						Sign Up
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}