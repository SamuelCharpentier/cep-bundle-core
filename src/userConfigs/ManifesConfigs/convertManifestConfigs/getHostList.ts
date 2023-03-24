import { isAll } from '@src/lib/typesAndValidators';
import type { HostList as UserManifestHostList } from '@src/userConfigs/UserManifestConfigs/Parts/HostList';
import { getHost } from './getHost';
import { getAllHostList } from './getAllHostList';
import { ManifestConfigs } from '../ManifestConfigs';

export function getHostList(
	receivedHostList: UserManifestHostList,
): ManifestConfigs['extensions'][0]['hostList'] {
	const hostList: ManifestConfigs['extensions'][0]['hostList'] = [];
	if (isAll(receivedHostList)) {
		return getAllHostList();
	}
	receivedHostList =
		receivedHostList instanceof Array
			? receivedHostList
			: [receivedHostList];
	receivedHostList.forEach((host) => {
		hostList.push(getHost(host));
	});
	return hostList;
}
