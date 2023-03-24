import { HostEngine, getHostEngineKey } from '@src/lib/enumsAndValidators';
import { defaultManifestConfigs } from './defaultManifestConfigs';
import { HostInfo } from '@src/userConfigs/UserManifestConfigs/Parts/HostInfo';
import { getHostEngine } from './getHostEngine';
import { isNumberObject } from 'util/types';
import { isInt } from '@src/lib/typesAndValidators';

export function getDebugPort(host: HostInfo): number {
	const hostEngine: HostEngine = getHostEngine(host);
	let debugPort: number;
	if (host.debugPort !== undefined && isInt(host.debugPort)) {
		if (typeof host.debugPort === 'number') debugPort = host.debugPort;
		else debugPort = parseInt(host.debugPort);
	} else {
		debugPort =
			defaultManifestConfigs.debugPorts[getHostEngineKey(hostEngine)];
	}
	return debugPort;
}
