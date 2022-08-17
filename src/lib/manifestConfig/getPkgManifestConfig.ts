import type { ConfigStructure } from '../typesAndValidators';
import { getPkgCEP } from '../getPkgCEP';

export function getPkgManifestConfig(root?: string): Partial<ConfigStructure> {
	const cepConfigs = getPkgCEP(root);
	let manifestConfig: Partial<ConfigStructure> = {};
	if (cepConfigs.manifest) {
		manifestConfig.manifest = cepConfigs.manifest;
	}
	if (cepConfigs.extensions) {
		manifestConfig.extensions = cepConfigs.extensions;
	}
	return manifestConfig;
}
