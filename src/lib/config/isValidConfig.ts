import { badArgumentError } from '../errorMessages';
import { isExtensionManifestArgument } from '../manifest/ExtensionManifest';
import { isRelativePath } from '../typesAndValidators';
import { getManifestArgFromConfig } from './getManifestArgFromConfig';
import type { Config } from './getConfig';

export function isValidConfig(config: any): config is Config {
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
}
