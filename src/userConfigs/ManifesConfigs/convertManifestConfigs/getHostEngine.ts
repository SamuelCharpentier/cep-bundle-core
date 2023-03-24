import { HostEngine, isHostEngineKey } from '@src/lib/enumsAndValidators';
import { HostInfo } from '@src/userConfigs/UserManifestConfigs/Parts/HostInfo';

export function getHostEngine(host: HostInfo): HostEngine {
	let hostEngine: HostEngine;
	if (isHostEngineKey(host.host)) {
		hostEngine = HostEngine[host.host];
	} else {
		hostEngine = host.host as HostEngine;
	}
	return hostEngine;
}
