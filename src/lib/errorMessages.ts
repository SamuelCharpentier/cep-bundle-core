export const badArgumentError = (argumentName: string, argumentType: string, valueReceived: any) =>
	`${argumentName} must be provided as a ${argumentType}, ${
		typeof valueReceived === 'string' ? `'${valueReceived}'` : valueReceived
	} (${typeof valueReceived}) received`;
export const bothNeedsToBeProvided: (
	arg1: string,
	arg2: string,
	constructorName: string,
	val1: any,
	val2: any,
) => string = (arg1: string, arg2: string, constructorName: string, val1: any, val2: any) => {
	let message: string = `Both ${arg1} and ${arg2} must be provided in a ${constructorName},`;
	message += ` ${typeof val1 === 'string' ? `'${val1}'` : val1} (${typeof val1})`;
	message += ` and ${typeof val2 === 'string' ? `'${val2}'` : val2} (${typeof val2}) received`;
	return message;
};

export const bothWidthAndHeightRequired: (constructorName: string, val1: any, val2: any) => string = (
	constructorName: string,
	val1: any,
	val2: any,
) => bothNeedsToBeProvided('width', 'height', constructorName, val1, val2);
