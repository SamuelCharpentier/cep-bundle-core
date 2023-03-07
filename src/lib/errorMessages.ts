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
			? `'${val}' `
			: val === null
			? 'null '
			: typeof val === 'function' && val.name !== ''
			? `${val.name}() `
			: typeof val === 'function' && val.name === ''
			? '[annonymous function] '
			: typeof val === 'object'
			? '\n' + prettierJSON(JSON.stringify(val))
			: val + ' '
	}(${val instanceof Array ? 'array' : val === null ? 'null' : typeof val})`;
};

export const badArgumentError = (
	argumentName: string,
	argumentType: string,
	valueReceived: any,
) =>
	`Validation Error: ${argumentName} must be provided as ${argumentType}, ${printVariableInError(
		valueReceived,
	)} received`;

export const badValueError = ({
	propertyName,
	required = false,
	when = undefined,
	expectedPropertyType,
	received,
}: {
	propertyName: string;
	required?: boolean | 'contextually required';
	when?: string;
	expectedPropertyType: string;
	received: any;
}) => {
	let errorString = `Validation Error: ${propertyName} `;
	if (when !== undefined)
		errorString += `is ${
			required ? 'required' : 'optional'
		} when ${when} and `;
	else if (required === 'contextually required')
		errorString += `(optional or required depending on the context) `;
	else errorString += required ? '(required) ' : '(optional) ';

	errorString += `must be provided as ${expectedPropertyType}, `;

	if (received instanceof GoodBadList) errorString += received.PrintInError();
	else errorString += printVariableInError(received);

	errorString += ' received';

	return errorString;
};

export class GoodBadList {
	constructor(public good: string[] = [], public bad: string[] = []) {}

	public PrintInError() {
		if (this.good.length === 0 && this.bad.length === 1)
			return printVariableInError(this.bad[0]);

		return `\nBad:\n\t❌ ${this.bad
			.map((item) => printVariableInError(item))
			.join('\n\t❌ ')}\nGood:\n\t✅ ${this.good
			.map((item) => printVariableInError(item))
			.join('\n\t✅ ')}\n`;
	}
}
