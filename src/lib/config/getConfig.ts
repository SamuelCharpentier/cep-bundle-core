import { defaultConfig } from './getDefaultConfig';
import { getPkgConfig } from './getPkgConfig';

import { getRuntimeConfig } from './getRuntimeConfig';
import path from 'path';
import { isValidConfig } from './isValidConfig';

export function getConfig(configOverrides?: { [key: string]: any }, root?: string) {
	root = root ? path.resolve(root) : process.cwd();
	configOverrides = configOverrides && isObject(configOverrides) ? configOverrides : {};
	const config = deepObjectMerge(defaultConfig, getPkgConfig(root), getRuntimeConfig(root), configOverrides);

	isValidConfig(config);

	return config;
}

getConfig(); //?

function isObject(item: any) {
	return item && typeof item === 'object' && !Array.isArray(item);
}

function deepObjectMerge(...sources: { [key: string]: any }[]) {
	let result: { [key: string]: any } = {};
	if (!sources.length) return result;

	for (const source of sources) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!result[key]) result[key] = source[key];
				else {
					result[key] = deepObjectMerge(result[key], source[key]);
				}
			} else {
				result[key] = source[key];
			}
		}
	}

	return result;
}
