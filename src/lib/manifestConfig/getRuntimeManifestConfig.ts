import { ManifestConfig } from '../typesAndValidators';
import { containsAValue } from '../validators';
import { getRuntimeConfigFile } from '../getRuntimeConfigFile';

export function getRuntimeManifestConfig(
	root?: string,
): Partial<ManifestConfig> {
	const loadedConfig = getRuntimeConfigFile(root);
	let config = {} as Partial<ManifestConfig>;
	if (loadedConfig.manifest) config.manifest = loadedConfig.manifest;
	if (loadedConfig.extensions) config.extensions = loadedConfig.extensions;
	return config;
}
