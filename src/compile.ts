import { CompileOptions, ManifestConfig } from './lib/typesAndValidators';
import { getManifestConfig } from './lib/manifestConfig/getManifestConfig';
import { getCompileOptions } from './lib/compileOptions/getCompileOptions';
import { enablePlayerDebugMode } from './debugMode';
import { symlinkExtension } from './symlink';
import { copyDependencies } from './copyDependencies';
import { writeExtensionTemplates } from './writeTemplates';
import { copyIcons } from './copyIcons';
import { DeepPartial } from './lib/deepPartial';

export function compile(
	usersCompileOption: DeepPartial<CompileOptions>,
	configOverrides?: DeepPartial<ManifestConfig>,
) {
	const compileOptions = getCompileOptions(usersCompileOption);
	const manifestConfig = getManifestConfig(
		compileOptions.root,
		configOverrides,
	);
	console.log(manifestConfig.authorName);

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
