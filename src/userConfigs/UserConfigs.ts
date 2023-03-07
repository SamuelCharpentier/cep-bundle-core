import { CompileOptions, isCompileOptions } from './CompileOptions';
import {
	isUserManifestConfigs,
	UserManifestConfigs,
} from './UserManifestConfigs';

export type UserConfigs = {
	manifest: UserManifestConfigs;
	compileOptions: CompileOptions;
};

export const isUserConfigs = (val: any): val is UserConfigs => {
	return (
		typeof val === 'object' &&
		val !== null &&
		'compileOptions' in val &&
		'manifest' in val &&
		isUserManifestConfigs(val.manifest) &&
		isCompileOptions(val.compileOptions)
	);
};
