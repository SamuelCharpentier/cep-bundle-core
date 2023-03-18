import { _UserManifestConfigs } from '@src/userConfigs/UserManifestConfigs';
import { getDependencyList } from './getDependencyList';
import { getDispatchInfo } from './getDispatchInfo';
import { getHostList } from './getHostList';
import { ManifestConfigs } from './convertToManifestConfigs';

export function getExtensions(
	receivedExtensions: _UserManifestConfigs['extensions'],
): ManifestConfigs['extensions'] {
	let extensions: ManifestConfigs['extensions'] = [];
	receivedExtensions =
		receivedExtensions instanceof Array
			? receivedExtensions
			: [receivedExtensions];
	receivedExtensions.forEach((extension) => {
		let {
			id,
			version,
			hostList: receivedHostList,
			dispatchInfo: receivedDispatchInfo,
			dependencyList: receivedDependencyList,
		} = extension;
		const hostList = getHostList(receivedHostList);
		const dispatchInfo = getDispatchInfo(receivedDispatchInfo);
		const dependencyList = getDependencyList(receivedDependencyList);

		extensions.push({
			id,
			version,
			hostList,
			dispatchInfo,
			dependencyList,
		});
	});
	return extensions;
}
