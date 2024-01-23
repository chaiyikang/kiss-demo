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
import { signOutAction } from "../lib/actions";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function AppNavbar({ session }) {
	const isLoggedIn = session?.user;
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
		<Navbar className="bg-slate-300 h-[6rem]">
			{/* logo */}
			<NavbarBrand>
				<Link href="/">
					<Image
						height={80}
						width={189}
						alt="Kitten Sanctuary Logo"
						src="/LOGOlandscape.png"
					/>
				</Link>
			</NavbarBrand>

			{/* nav links */}
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{links.map((link) => (
					<NavbarItem key={link.name}>
						<Link
							color={
								pathname.split("/").slice(0, 2).join("/") === link.href
									? ""
									: "foreground"
							}
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
				{!isLoggedIn ? (
					<>
						<NavbarItem className="hidden lg:flex">
							<Link href="/login">Login</Link>
						</NavbarItem>
						<NavbarItem>
							<Button as={Link} color="primary" href="/register" variant="flat">
								Sign Up
							</Button>
						</NavbarItem>
					</>
				) : (
					<>
						<NavbarItem>
							<form action={signOutAction}>
								<Button type="submit" color="primary" variant="flat">
									Log Out
								</Button>
							</form>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
		</Navbar>
	);
}
