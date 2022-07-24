import { defaultManifestConfig } from './getDefaultConfig';
import { getPkgManifestConfig } from './getPkgManifestConfig';

import { getRuntimeConfig } from './getRuntimeConfig';

import { isObject } from '../validators';
import type { ExtensionManifestArgument } from '@manifest/ExtensionManifest';
import { isExtensionManifestArgument } from '@manifest/ExtensionManifest';
import { badArgumentError } from '../errorMessages';
import { isRelativePath } from '../typesAndValidators';
import { CompileOptions } from '../compileOptions/getCompileOptions';
import { DeepPartial } from '../deepPartial';
import type { RuntimeConfig } from '@src/lib/runtimeConfigType';

export function getManifestConfig(
	compileOptions: CompileOptions,
	configOverrides?: DeepPartial<RuntimeConfig>,
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
	console.log(sources.length);
	let result: { [key: string]: any } = {};
	if (!sources.length) return result;

	for (const source of sources) {
		for (const key in source) {
			const value = source[key];
			if (isObject(value)) {
				if (!result[key]) result[key] = value;
				else {
					result[key] = deepObjectMerge(result[key], value);
				}
			} else {
				result[key] = value;
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
	return manifestArgument;
}
