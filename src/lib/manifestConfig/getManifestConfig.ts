import { defaultManifestConfig } from './getDefaultConfig';
import { getPkgManifestConfig } from './getPkgManifestConfig';

import { getRuntimeManifestConfig } from './getRuntimeManifestConfig';

import { isObject } from '../validators';
import type { ExtensionManifestArgument } from '@manifest/ExtensionManifest';
import { isManifestArgument } from '@manifest/ExtensionManifest';
import { badArgumentError } from '../errorMessages';
import { ManifestConfig } from '../typesAndValidators';
import { DeepPartial } from '../deepPartial';
import { isExtensionListArgument } from '../manifest/ExtensionList';

export function getManifestConfig(
	root?: string,
	configOverrides: DeepPartial<ManifestConfig> = {},
): ExtensionManifestArgument {
	const pkgManifestConfig = getPkgManifestConfig(root);
	const runtimeManifestConfig = getRuntimeManifestConfig(root);
	const mergedConfigs = deepObjectMerge(
		defaultManifestConfig,
		pkgManifestConfig,
		runtimeManifestConfig,
		configOverrides,
	);

	const config = getManifestArgFromConfig(mergedConfigs);
	return config;
}

deepObjectMerge({ something: 'string' }, {}, {});

function deepObjectMerge(...sources: { [key: string]: any }[]) {
	let result: { [key: string]: any } = {};

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
	try {
		isManifestArgument(config.manifest);
	} catch (error) {
		console.error(error);
		throw badArgumentError(
			'manifest configs',
			'a ManifestArgument (type)',
			config.manifest,
		);
	}
	try {
		isExtensionListArgument(config.extensions);
	} catch (error) {
		console.error(error);
		throw badArgumentError(
			'extension configs',
			'a ExtensionListArgument (type)',
			config.extensions,
		);
	}
	let manifestArgument = {
		...config.manifest,
		extensions: config.extensions,
	};
	return manifestArgument;
}
