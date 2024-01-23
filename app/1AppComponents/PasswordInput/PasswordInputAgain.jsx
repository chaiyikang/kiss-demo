"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

export default function PasswordInputAgain({ isInvalid, errorMessage }) {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	return (
		<Input
			isInvalid={isInvalid}
			errorMessage={errorMessage}
			name="passwordAgain"
			label="Password"
			variant="bordered"
			placeholder="Enter your password again"
			endContent={
				<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
					{isVisible ? (
						<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
					) : (
						<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
					)}
				</button>
			}
			type={isVisible ? "text" : "password"}
			className="max-w-xs mt-4"
		/>
	);
}
