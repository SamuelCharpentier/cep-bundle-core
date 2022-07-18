import { getManifestConfig } from './lib/manifestConfig/getManifestConfig';
import { enablePlayerDebugMode } from './debugMode';
import { symlinkExtension } from './symlink';
import { copyDependencies } from './copyDependencies';
import { writeExtensionTemplates } from './writeTemplates';
import { copyIcons } from './copyIcons';
import { ExtensionManifestArgument } from '@manifest/ExtensionManifest';
import {
	CompileOptions,
	getCompileOptions,
} from './lib/compileOptions/getCompileOptions';
import { DeepPartial } from './lib/deepPartial';
import { RuntimeConfig } from './lib/runtimeConfigType';

export function compile(
	usersCompileOption: DeepPartial<CompileOptions>,
	configOverrides?: DeepPartial<RuntimeConfig>,
) {
	const compileOptions = getCompileOptions(usersCompileOption);
	const manifestConfig = getManifestConfig(compileOptions, configOverrides);
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
