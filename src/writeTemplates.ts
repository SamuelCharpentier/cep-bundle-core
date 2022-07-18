import fsExtra from 'fs-extra';
import path from 'path';

import {
	ExtensionManifest,
	ExtensionManifestArgument,
} from '@manifest/ExtensionManifest';
import { ExtensionList } from './lib/manifest/ExtensionList';
import devHTMLTemplate from './templates/html';
import { CompileOptions } from './lib/compileOptions/getCompileOptions';
import { ExtensionArgument } from './lib/manifest/Extension';

function ensureAndGetManifestDir(compileOptions: CompileOptions) {
	const { root, outputFolder } = compileOptions;
	const manifestDir = path.join(root, outputFolder, 'CSXS');
	fsExtra.ensureDirSync(manifestDir);
	return manifestDir;
}

function writeManifestXMLFile(
	compileOptions: CompileOptions,
	manifestConfig: ExtensionManifestArgument,
) {
	const manifestDir = ensureAndGetManifestDir(compileOptions);
	const manifestFile = path.join(manifestDir, 'manifest.xml');
	fsExtra.writeFileSync(
		manifestFile,
		new ExtensionManifest(manifestConfig).xml(['manifest.xml']),
	);
	return manifestFile;
}

function writeDebugFile(
	compileOptions: CompileOptions,
	manifestConfig: ExtensionManifestArgument,
) {
	const { root, outputFolder, debugInProduction, isDev } = compileOptions;

	if (debugInProduction || isDev) {
		fsExtra.writeFileSync(
			path.join(root, outputFolder, '.debug'),
			new ExtensionList(manifestConfig.extensions).xml(['.debug']),
		);
	}
	return;
}

function getExtensionDevPannelContent(
	compileOptions: CompileOptions,
	extension: ExtensionArgument,
) {
	const redirectLocationHref =
		compileOptions.devHostPort !== undefined
			? `${compileOptions.devHost}:${compileOptions.devHostPort}`
			: `${compileOptions.devHost}`;
	let title =
		extension.dispatchInfo instanceof Array
			? extension.dispatchInfo[0]?.ui?.menu?.menuName
			: extension.dispatchInfo?.ui?.menu?.menuName;
	return devHTMLTemplate({
		title,
		redirectLocationHref,
	});
}

function writeDevPannels(
	compileOptions: CompileOptions,
	manifestConfig: ExtensionManifestArgument,
) {
	const { root, outputFolder, isDev } = compileOptions;
	if (isDev) {
		const extensions =
			manifestConfig.extensions instanceof Array
				? manifestConfig.extensions
				: [manifestConfig.extensions];
		for (const extension of extensions) {
			const devPannelContent = getExtensionDevPannelContent(
				compileOptions,
				extension,
			);
			fsExtra.writeFileSync(
				path.join(root, outputFolder, `${extension.id}.html`),
				devPannelContent,
			);
		}
	}
}

export async function writeExtensionTemplates(
	compileOptions: CompileOptions,
	manifestConfig: ExtensionManifestArgument,
) {
	writeManifestXMLFile(compileOptions, manifestConfig);
	writeDebugFile(compileOptions, manifestConfig);
	writeDevPannels(compileOptions, manifestConfig);
	return;
}
