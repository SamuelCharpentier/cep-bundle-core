const prettier = require('prettier');
function prettierJSON(string: string) {
	return prettier.format(string, {
		tabWidth: 4,
		useTabs: true,
		trailingComma: 'all',
		semi: true,
		singleQuote: true,
		bracketSpacing: true,
		parser: 'json',
	});
}

export const printVariableInError: (v: any) => string = (val) => {
	return `${
		typeof val === 'string' ? `'${val}'` : typeof val === 'object' ? '\n' + prettierJSON(JSON.stringify(val)) : val
	} (${val instanceof Array ? 'array' : typeof val})`;
};

export const badArgumentError = (argumentName: string, argumentType: string, valueReceived: any) =>
	`${argumentName} must be provided as ${argumentType},
	${printVariableInError(valueReceived)} received`;

export const bothNeedsToBeProvided: (
	arg1: string,
	arg2: string,
	constructorName: string,
	val1: any,
	val2: any,
) => string = (
	arg1: string,
	arg2: string,
	constructorName: string,
	val1: any,
	val2: any,
) => `Both ${arg1} and ${arg2} must be provided in a ${constructorName},
	${printVariableInError(val1)}
	and
	${printVariableInError(val2)}`;

export const bothWidthAndHeightRequired: (constructorName: string, val1: any, val2: any) => string = (
	constructorName: string,
	val1: any,
	val2: any,
) => bothNeedsToBeProvided('width', 'height', constructorName, val1, val2);
