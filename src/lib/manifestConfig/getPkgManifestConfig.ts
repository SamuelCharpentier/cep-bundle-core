import type { configStructure } from '../typesAndValidators';
import { getPkgCEP } from '../getPkgCEP';

export function getPkgManifestConfig(root?: string): Partial<configStructure> {
	const cepConfigs = getPkgCEP(root);
	let manifestConfig: Partial<configStructure> = {};
	if (cepConfigs.manifest) {
		manifestConfig.manifest = cepConfigs.manifest;
	}
	if (cepConfigs.executionEnvironment) {
		manifestConfig.executionEnvironment = cepConfigs.executionEnvironment;
	}
	if (cepConfigs.extensions) {
		manifestConfig.extensions = cepConfigs.extensions;
	}
	return manifestConfig;
}
