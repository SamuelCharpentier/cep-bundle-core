const isUndefined = (a: any) => a === undefined;
const isEmptyString = (a: any) => typeof a === 'string' && a.length === 0;
const isEmptyArray = (a: any) => a instanceof Array && a.length === 0;
const isEmptyObject = (a: any) =>
	a instanceof Object && Object.keys(a).length === 0;
export const notAValue = (a: any) =>
	isUndefined(a) || isEmptyString(a) || isEmptyArray(a) || isEmptyObject(a);

export function isObject(item: any) {
	return item && typeof item === 'object' && !Array.isArray(item);
}
