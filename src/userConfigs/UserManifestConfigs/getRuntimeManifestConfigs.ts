import { getRuntimeConfigFile } from '@src/userConfigs/UserManifestConfigs/getRuntimeConfigFile';

export function getRuntimeManifestConfigs(root?: string): any {
	return getRuntimeConfigFile(root).manifest || {};
}
