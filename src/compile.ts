import { CompileOptions, ManifestConfig } from './lib/typesAndValidators';
import { getManifestConfig } from './lib/manifestConfig/getManifestConfig';
import { getCompileOptions } from './userConfigs/UserCompileOptions/UserCompileOptions';
import { enablePlayerDebugMode } from './debugMode';
import { symlinkExtension } from './symlink';
import { copyDependencies } from './copyDependencies';
import { writeExtensionTemplates } from './writeTemplates';
import { copyIcons } from './copyIcons';
import { DeepPartial } from './lib/deepPartial';
import { UserManifestConfigs } from './userConfigs/UserManifestConfigs/UserManifestConfigs';

export function compile(
	usersCompileOption: DeepPartial<CompileOptions>,
	configOverrides?: DeepPartial<UserManifestConfigs>,
) {
	const compileOptions = getCompileOptions(usersCompileOption);
	const manifestConfig = getManifestConfig(
		compileOptions.root,
		configOverrides,
	);

	if (usersCompileOption.isDev) {
		enablePlayerDebugMode();
		if (compileOptions.symlink) {
			symlinkExtension({
				bundleId: manifestConfig.extensionBundle.id,
				out: compileOptions.outputFolder,
				root: compileOptions.root,
			});
		}
	}
	copyDependencies({
		root: compileOptions.root,
		out: compileOptions.outputFolder,
	});
	writeExtensionTemplates(compileOptions, manifestConfig);

	copyIcons(manifestConfig);
}
