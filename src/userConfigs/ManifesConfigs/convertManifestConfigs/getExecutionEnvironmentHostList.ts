import { combineHostVersion } from './combineHostVersion';
import { ManifestConfigs } from '../ManifestConfigs';

export function getExecutionEnvironmentHostList(
	extensions: ManifestConfigs['extensions'],
): ManifestConfigs['executionEnvironment']['hostList'] {
	let hostList: ManifestConfigs['executionEnvironment']['hostList'] = [];
	extensions.forEach((extension) => {
		extension.hostList.forEach((host) => {
			if (!hostList.some((h) => h.host === host.host)) {
				hostList.push({ host: host.host, version: host.version });
			} else {
				const hostIndex = hostList.findIndex(
					(h) => h.host === host.host,
				);
				hostList[hostIndex].version = combineHostVersion(
					hostList[hostIndex].version,
					host.version,
				);
			}
		});
	});
	return hostList;
}
