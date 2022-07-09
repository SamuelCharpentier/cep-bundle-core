import { defaultManifestConfig } from './getDefaultConfig';
import { getPkgManifestConfig } from './getPkgConfig';

import { getRuntimeConfig } from './getRuntimeConfig';

import { isObject } from '../validators';
import type { ExtensionManifestArgument } from '@manifest/ExtensionManifest';
import { isExtensionManifestArgument } from '@manifest/ExtensionManifest';
import { badArgumentError } from '../errorMessages';
import { isRelativePath } from '../typesAndValidators';
import { CompileOptions } from '../compileOptions/getCompileOptions';

export function getManifestConfig(
	compileOptions: CompileOptions,
	configOverrides?: Partial<ExtensionManifestArgument>,
): ExtensionManifestArgument {
	configOverrides =
		configOverrides && isObject(configOverrides) ? configOverrides : {};
	const config = getManifestArgFromConfig(
		deepObjectMerge(
			defaultManifestConfig,
			getPkgManifestConfig(compileOptions.root),
			getRuntimeConfig(compileOptions.root),
			configOverrides,
		),
	);

	if (!isExtensionManifestArgument(config)) {
		throw badArgumentError('', 'getManifestConfig', config);
	}

	return config;
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

export function getManifestArgFromConfig(
	config: any,
): ExtensionManifestArgument {
	let manifestArgument = {
		...config.manifest,
		extensions: config.extensions,
		executionEnvironment: config.executionEnvironment,
	};
	console.log(manifestArgument);
	return manifestArgument;
}
