import { manifestConfig } from '../typesAndValidators';
import { containsAValue } from '../validators';
import { getRuntimeConfigFile } from '../getRuntimeConfigFile';

export function getRuntimeManifestConfig(
	root?: string,
): Partial<manifestConfig> {
	if (root) {
		const loadedConfig = getRuntimeConfigFile(root);
		if (!containsAValue(loadedConfig))
			console.warn(
				'No cep config present in .cep.config.js. Make sure to use a module.exports object.',
			);
		let config = {} as Partial<manifestConfig>;
		if (loadedConfig.manifest) config.manifest = loadedConfig.manifest;
		if (loadedConfig.executionEnvironment)
			config.executionEnvironment = loadedConfig.executionEnvironment;
		if (loadedConfig.extensions)
			config.extensions = loadedConfig.extensions;
		return config;
	}
	console.warn('No root provided, no cep config files loaded.');
	return {};
}
