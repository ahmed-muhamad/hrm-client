const extractHighestId = <Obj>(
	array: Array<Obj>,
	propertyName: keyof Obj
): number => {
	if (!array.length) return -1;
	let highestId = array[0][propertyName];
	array.forEach((obj: Obj) =>
		obj[propertyName] > highestId
			? (highestId = obj[propertyName])
			: highestId
	);
	return highestId as number;
};

export { extractHighestId };
