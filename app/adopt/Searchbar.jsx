"use client";
import { Input } from "@nextui-org/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
export default function Searchbar() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	function handleInput(e) {
		const input = e.target.value;
		const params = new URLSearchParams(searchParams);
		if (input) {
			params.set("catQuery", input);
		} else {
			params.delete("catQuery");
		}
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<div>
			<Input
				classNames={{
					base: "max-w-full sm:max-w-[10rem] h-10",
					mainWrapper: "h-full",
					input: "text-small",
					inputWrapper:
						"h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
				}}
				placeholder="Type to search..."
				size="sm"
				startContent={"hi"}
				type="search"
				onChange={handleInput}
				defaultValue={searchParams.get("catQuery")?.toString()}
			/>
		</div>
	);
}
