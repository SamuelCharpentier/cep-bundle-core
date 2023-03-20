import {
	HostEngine,
	isHostEngineValue,
	isHostEngineKey,
} from '@src/lib/enumsAndValidators';
import { defaultManifestConfigs } from './defaultManifestConfigs';
import { ManifestConfigs } from './convertToManifestConfigs';

export function getAllHostList(): ManifestConfigs['extensions'][0]['hostList'] {
	const hostList: ManifestConfigs['extensions'][0]['hostList'] = [];
	for (const host in HostEngine) {
		if (isHostEngineKey(host))
			hostList.push({
				host: HostEngine[host],
				version: '[0,999]',
				debugPort: defaultManifestConfigs.debugPorts[host],
			});
	}
	return hostList;
}
