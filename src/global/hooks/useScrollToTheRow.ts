import { useEffect } from "react";

const useScrollToTheRow = (
	element: HTMLElement | null,
	wrapper: HTMLElement | null,
	dependencies: Array<boolean | Array<boolean>>
): void => {
	useEffect(() => {
		if (!element || !wrapper) return;
		const elementLocation = element.offsetTop - wrapper.scrollTop - 64;
		wrapper.scrollBy({
			top: elementLocation,
			behavior: "smooth",
		});
	}, dependencies);
};

export { useScrollToTheRow };
