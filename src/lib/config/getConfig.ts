import { defaultConfig } from './getDefaultConfig';
import { getPkgConfig } from './getPkgConfig';

import { getRuntimeConfig } from './getRuntimeConfig';
import path from 'path';

import type { ExtensionManifestArgument, ManifestArgument } from '../manifest/ExtensionManifest';
import { isExtensionManifestArgument } from '../manifest/ExtensionManifest';
import { ExtensionArgument } from '../manifest/Extension';
import { badArgumentError } from '../errorMessages';
import { isRelativePath } from '../typesAndValidators';
import { CompileOptions } from '../../compile';

export type Config = {
	manifest: ManifestArgument;
	extensions: ExtensionArgument | ExtensionArgument[];
};
export function getConfig(compileOptions: CompileOptions, configOverrides?: Partial<Config>): Config {
	configOverrides = configOverrides && isObject(configOverrides) ? configOverrides : {};
	const config = deepObjectMerge(
		defaultConfig,
		getPkgConfig(compileOptions.root),
		getRuntimeConfig(compileOptions.root),
		configOverrides,
	);

	if (!isValidConfig(config)) throw new Error('Invalid config file');

	return config;
}

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

export const isValidConfig = <(arg: any) => arg is Config>((config) => {
	const { outputFolder, isDev, devHost } = config;
	if (!isRelativePath(outputFolder))
		throw new Error(badArgumentError('outputFolder', 'string of type RelativePath', outputFolder));
	if (isDev && typeof isDev !== 'boolean')
		throw new Error(badArgumentError('isDev', 'boolean or leave undefined for default (default is false)', isDev));
	if (devHost && typeof devHost !== 'string')
		throw new Error(
			badArgumentError(
				'devHost',
				'a string containing a hostname or leave undefined for default (default is localhost)',
				devHost,
			),
		);

	isExtensionManifestArgument(getManifestArgFromConfig(config));

	return true;
});

export function getManifestArgFromConfig(config: any): ExtensionManifestArgument {
	return { ...config.manifest, extensions: config.extensions };
}
