import { AllDispatchInfo as UserAllDispatchInfo } from '@src/userConfigs/UserManifestConfigs/Parts/AllDispatchInfo';
import { ManifestConfigs } from '../ManifestConfigs';

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
