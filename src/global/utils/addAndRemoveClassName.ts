const addAndRemoveClassName = (
	element: HTMLElement | null,
	className: string,
	delayMilliseconds: number
): void => {
	// Add class name
	setTimeout(() => {
		if (element) element.className = className;
	}, 0);
	// Remove class name
	setTimeout(() => {
		if (element) element.className = "";
	}, delayMilliseconds);
};

export { addAndRemoveClassName };
