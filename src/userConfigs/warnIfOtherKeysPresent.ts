export const warnIfOtherKeysPresent = (
	obj: { [key: string]: any },
	parents: string[] = [],
	validStructure: { [key: string]: any } = {},
): string[] => {
	const objKeys: string[] = Object.keys(obj);
	const validStructureKeys: string[] = Object.keys(validStructure);
	const cumulatedWarnings: string[] = [];
	for (const key of objKeys) {
		if (validStructureKeys.includes(key)) {
			if (typeof validStructure[key] === 'object') {
				cumulatedWarnings.push(
					...warnIfOtherKeysPresent(
						obj[key],
						[...parents, key],
						validStructure[key],
					),
				);
				continue;
			}
			continue;
		}
		if (typeof obj[key] === 'object') {
			cumulatedWarnings.push(
				...warnIfOtherKeysPresent(obj[key], [...parents, key]),
			);
			continue;
		}
		cumulatedWarnings.push(`${[...parents, key].join('.')} is ignored`);
	}
	return cumulatedWarnings;
};
