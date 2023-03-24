import type { ConfigStructure } from '../../lib/typesAndValidators';
import { getPkgCEP } from '../getPkgCEP';

export function getPkgManifestConfigs(root?: string): any {
	const cepConfigs = getPkgCEP(root);
	let manifestConfig: Partial<ConfigStructure> = {};
	if (cepConfigs.manifest !== undefined) {
		manifestConfig.manifest = cepConfigs.manifest;
	}
	if (cepConfigs.extensions !== undefined) {
		manifestConfig.extensions = cepConfigs.extensions;
	}
	return manifestConfig;
}
