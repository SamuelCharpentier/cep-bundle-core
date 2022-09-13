enum Descriptors {
	'undefined' = 'undefined',
	'null' = 'null',
	'string' = 'string',
	'number' = 'number',
	'boolean' = 'boolean',
	'empty array' = 'empty array',
	'empty object' = 'empty object',
	'function' = 'function',
}
export type Case = [string, any, string?];
function isCase(val: unknown): val is Case {
	if (!(val instanceof Array)) return false;
	if (val.length < 2) return false;
	if (typeof val[0] !== 'string') return false;
	if (val[2] !== undefined && typeof val[2] !== 'string') return false;
	return true;
}

export type Cases = Case[];
function isCases(val: unknown): val is Cases {
	if (!(val instanceof Array)) return false;
	for (const index in val) {
		const item = val[index];
		if (!isCase(item)) {
			console.warn(
				`the case at index ${index} (${JSON.stringify(
					item,
				)}) is not a valid case`,
			);
			return false;
		}
	}
	return true;
}
const argumentCases: Cases = [
	['undefined', undefined, 'undefined (undefined)'],
	['null', null, 'null (null)'],
	['a string', 'hello', "'hello' (string)"],
	['a number', 1, '1 (number)'],
	['a boolean', true, 'true (boolean)'],
	['an empty array', [], '\n[]\n(array)'],
	['an empty object', {}, '\n{}\n(object)'],
	['a function', function func() {}, 'func() (function)'],
];

export function getArgumentCases(goodDescriptors?: undefined): Cases;
export function getArgumentCases(
	goodDescriptors: (Descriptors | keyof typeof Descriptors)[],
	customValidArgumentCases?: { good?: Case | Cases; bad?: Case | Cases },
): { good: Cases; bad: Cases };
export function getArgumentCases(
	goodDescriptors?: (Descriptors | keyof typeof Descriptors)[],
	customValidArgumentCases: { good?: Case | Cases; bad?: Case | Cases } = {},
): { good: Cases; bad: Cases } | Cases {
	if (goodDescriptors === undefined) {
		return argumentCases;
	}

	const result: { good: Cases; bad: Cases } = { good: [], bad: [] };

	const goodRegex = new RegExp(`^(a |an )?(${goodDescriptors.join('|')})$`);
	for (const [description, data, errorMessage] of argumentCases) {
		if (goodRegex.test(description)) {
			result.good.push([description, data, errorMessage]);
		} else {
			result.bad.push([description, data, errorMessage]);
		}
	}
	for (const key of Object.keys(
		customValidArgumentCases,
	) as (keyof typeof customValidArgumentCases)[]) {
		let cases = customValidArgumentCases[key];
		if (cases === undefined) continue;
		cases = isCase(cases) ? [cases] : cases;
		if (!isCases(cases))
			console.warn(
				`getArgumentCases functions second argument needs to be a Case or an array of Case, ${customValidArgumentCases} is ignored`,
			);
		result[key].push(...cases);
	}
	return result;
}
