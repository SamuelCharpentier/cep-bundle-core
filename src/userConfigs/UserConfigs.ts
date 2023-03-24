import {
	_UserManifestConfigs,
	getUserManifestConfigs,
} from './UserManifestConfigs/UserManifestConfigs';
import {
	UserCompileOptions,
	getUserCompileOptions,
} from './UserCompileOptions/UserCompileOptions';

export type UserConfigs = {
	manifest: _UserManifestConfigs;
	compileOptions: UserCompileOptions;
};

export const getUserConfigs = ({
	userCompileOptionsOverrides,
	userManifestConfigsOverrides,
}: any): UserConfigs => {
	const userCompileOptions = getUserCompileOptions(
		userCompileOptionsOverrides,
	);
	const userManifestConfigs = getUserManifestConfigs(
		userCompileOptions.root,
		userManifestConfigsOverrides,
	);
	return {
		compileOptions: userCompileOptions,
		manifest: userManifestConfigs,
	};
};
