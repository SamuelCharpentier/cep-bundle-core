import { isObject } from './validators';

export function deepObjectMerge(...sources: { [key: string]: any }[]) {
	let result: { [key: string]: any } = {};

	for (const source of sources) {
		for (const key in source) {
			const value = source[key];
			if (isObject(value) && isObject(result[key]))
				result[key] = deepObjectMerge(result[key], value);
			else {
				result[key] = value;
			}
		}
	}
	return result;
}
