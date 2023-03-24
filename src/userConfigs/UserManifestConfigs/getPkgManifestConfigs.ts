import { getPkgCEP } from '../getPkgCEP';

export function getPkgManifestConfigs(root?: string): any {
	const cepConfigs = getPkgCEP(root);
	return cepConfigs?.manifest;
}
