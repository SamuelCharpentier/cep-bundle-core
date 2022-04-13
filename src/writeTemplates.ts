import fs from 'fs-extra';
import path from 'path';

import { Config, getManifestArgFromConfig } from './lib/config/getConfig';
import { ExtensionManifest } from './lib/manifest/ExtensionManifest';
import panelTemplate from './templates/html';
import { compile, CompileOptions } from './compile';
import { Extension, ExtensionArgument } from './lib/manifest/Extension';

export function writeExtensionTemplates(
	compileOptions: CompileOptions,
	config: Config,
) {
	const extensionManifest = new ExtensionManifest(
		getManifestArgFromConfig(config),
	);
	const manifestContents = extensionManifest.xml(['manifest.xml']);
	const { outputFolder, debugInProduction, isDev } = compileOptions;
	const extensions =
		config.extensions instanceof Array
			? config.extensions
			: [config.extensions];
	const manifestDir = path.join(outputFolder, 'CSXS');
	const manifestFile = path.join(manifestDir, 'manifest.xml');
	return Promise.resolve()
		.then(() => fs.ensureDir(manifestDir))
		.then(() => fs.writeFile(manifestFile, manifestContents))
		.then(() => {
			let chain = Promise.resolve();
			if (debugInProduction || isDev) {
				const debugContents = extensionManifest.xml(['.debug']);
				chain = chain.then(() =>
					fs.writeFile(
						path.join(outputFolder, '.debug'),
						debugContents,
					),
				);
			}
			if (isDev)
				if (extensions instanceof Array)
					extensions.forEach((extension: ExtensionArgument) => {
						const href = compileOptions.devHostPort
							? `http://${compileOptions.devHost}:${compileOptions.devHostPort}`
							: `http://${compileOptions.devHost}`;
						const panelContents = panelTemplate({
							title: extension.dispatchInfo?.ui?.menu?.menuName,
							href,
						});
						chain = chain.then(() =>
							fs.writeFile(
								path.join(
									outputFolder,
									`dev.${extension.id}.html`,
								),
								panelContents,
							),
						);
					});
			return chain;
		});
}
