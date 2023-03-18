import { HostEngine, isHostEngineValue } from '@src/lib/enumsAndValidators';
import { defaultManifestConfigs } from './defaultManifestConfigs';
import { ManifestConfigs } from './convertToManifestConfigs';

export function getAllHostList(): ManifestConfigs['extensions'][0]['hostList'] {
	const hostList: ManifestConfigs['extensions'][0]['hostList'] = [];
	for (const host in HostEngine) {
		if (isHostEngineValue(host))
			hostList.push({
				host: host,
				version: '[0, 999]',
				debugPort: defaultManifestConfigs.debugPorts[host],
			});
	}
	return hostList;
}
