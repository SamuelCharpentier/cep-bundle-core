const isUndefined = (a: any) => a === undefined;
export const isEmptyString = (a: any) =>
	typeof a === 'string' && a.length === 0;
const isEmptyArray = (a: any) => a instanceof Array && a.length === 0;
const isEmptyObject = (a: any) =>
	typeof a == 'object' && Object.keys(a).length === 0;
export const containsAValue = (a: any) =>
	!isUndefined(a) &&
	(!isEmptyString(a) || !isEmptyArray(a) || !isEmptyObject(a));

export function isObject(item: any): item is Object {
	return item && typeof item === 'object' && !Array.isArray(item);
}
