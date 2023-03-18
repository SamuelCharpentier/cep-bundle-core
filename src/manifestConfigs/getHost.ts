import { HostEngine } from '@src/lib/enumsAndValidators';
import { RangedVersion } from '@src/lib/typesAndValidators';
import { HostInfo } from '@src/userConfigs/HostInfo';
import { getHostEngine } from './getHostEngine';
import { getRangedVersion } from './getRangedVersion';
import { getDebugPort } from './getDebugPort';

export function getHost(host: HostInfo): {
	host: HostEngine;
	version: RangedVersion;
	debugPort: number;
} {
	return {
		host: getHostEngine(host),
		version: getRangedVersion(host),
		debugPort: getDebugPort(host),
	};
}
