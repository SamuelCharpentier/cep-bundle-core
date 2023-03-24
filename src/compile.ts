import { enablePlayerDebugMode } from './debugMode';
import { symlinkExtension } from './symlink';
import { copyDependencies } from './copyDependencies';
import { writeExtensionTemplates } from './writeTemplates';
import { copyIcons } from './copyIcons';
import { DeepPartial } from './lib/deepPartial';
import { UserManifestConfigs } from './userConfigs/UserManifestConfigs/UserManifestConfigs';
import { getUserConfigs } from './userConfigs/UserConfigs';
import { convertToManifestConfigs } from './userConfigs/ManifesConfigs/ManifestConfigs';
import { UserCompileOptions } from './userConfigs/UserCompileOptions/UserCompileOptions';

export function compile({
	compileOptions: compileOptionsOverride,
	manifest: manifestConfigsOverride,
}: {
	manifest: DeepPartial<UserManifestConfigs>;
	compileOptions: DeepPartial<UserCompileOptions>;
}) {
	const { compileOptions, manifest: userManifestConfigs } = getUserConfigs({
		compileOptionsOverride,
		manifestConfigsOverride,
	});
	const manifestConfig = convertToManifestConfigs(userManifestConfigs);

	if (compileOptions.isDev) {
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
