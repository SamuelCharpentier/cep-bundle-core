import { HostEngine } from '@src/lib/enumsAndValidators';
import { defaultManifestConfigs } from './defaultManifestConfigs';
import { HostInfo } from '@src/userConfigs/HostInfo';
import { getHostEngine } from './getHostEngine';

export function getDebugPort(host: HostInfo) {
	const hostEngine: HostEngine = getHostEngine(host);
	let debugPort: number;
	if (host.debugPort !== undefined && typeof host.debugPort === 'number') {
		debugPort = host.debugPort;
	} else {
		debugPort = defaultManifestConfigs.debugPorts[hostEngine];
	}
	return debugPort;
}
