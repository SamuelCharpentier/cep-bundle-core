import { _UserManifestConfigs } from '@src/userConfigs/UserManifestConfigs';
import { DeepPartial } from '@src/lib/deepPartial';

import { exampleUserManifestConfigs } from '@tests/userConfigs/userConfigs.example';

export function blendConfigs(
	badConfigs: DeepPartial<_UserManifestConfigs>,
): _UserManifestConfigs {
	return {
		...exampleUserManifestConfigs,
		...badConfigs,
	} as _UserManifestConfigs;
}
