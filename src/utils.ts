export function removeUndefinedNullAndEmpty(obj: { [index: string]: any }, recursive: boolean = true) {
	obj = { ...obj };
	for (var propName in obj) {
		if (
			obj[propName] === null ||
			obj[propName] === undefined ||
			obj[propName] === '' ||
			(obj[propName] instanceof Array && obj[propName].length <= 0) ||
			Object.keys(obj[propName]).length <= 0
		)
			delete obj[propName];
		else if (recursive && typeof obj[propName] === 'object') {
			if (obj[propName] instanceof Array) {
				obj[propName] = obj[propName].filter(
					(value: any) => value !== undefined && value !== null && value !== '',
				);
			} else {
				obj[propName] = removeUndefinedNullAndEmpty(obj[propName]);
			}
		}
	}
	return obj;
}

function camelToSnake(str: string) {
	return str.replace(/([A-Z])/g, (part) => `_${part.toLowerCase()}`);
}

export function objectToProcessEnv(obj: any) {
	// assign object to process.env so they can be used in the code
	Object.keys(obj).forEach((key) => {
		const envKey = camelToSnake(key).toUpperCase();
		const value = typeof obj[key] === 'string' ? obj[key] : JSON.stringify(obj[key]);
		process.env[envKey] = value;
	});
}
