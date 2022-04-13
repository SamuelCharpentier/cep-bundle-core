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

const printVariableInError: (v: any) => string = (val) => {
	return `${
		typeof val === 'string'
			? `'${val}'`
			: typeof val === 'function'
			? '[Function]'
			: typeof val === 'object'
			? '\n' + prettierJSON(JSON.stringify(val))
			: val
	} (${val instanceof Array ? 'array' : typeof val})`;
};

export const badArgumentError = (
	argumentName: string,
	argumentType: string,
	valueReceived: any,
) =>
	`Validation Error: ${argumentName} must be provided as ${argumentType}, ${printVariableInError(
		valueReceived,
	)} received`;
