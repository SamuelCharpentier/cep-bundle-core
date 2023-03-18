import { AllDispatchInfo as UserAllDispatchInfo } from '@src/userConfigs/AllDispatchInfo';
import { ManifestConfigs } from './convertToManifestConfigs';

export function getDispatchInfo(
	userDispatchInfo: UserAllDispatchInfo,
): ManifestConfigs['extensions'][0]['dispatchInfo'] {
	let dispatchInfo: ManifestConfigs['extensions'][0]['dispatchInfo'] = [];

	userDispatchInfo =
		userDispatchInfo instanceof Array
			? userDispatchInfo
			: [userDispatchInfo];
	userDispatchInfo.forEach((dispatch) => {
		dispatchInfo.push(dispatch);
	});
	return dispatchInfo;
}
