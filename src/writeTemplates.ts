import fsExtra from 'fs-extra';
import path from 'path';

import {
	ExtensionManifest,
	ExtensionManifestArgument,
} from '@manifest/ExtensionManifest';
import { ExtensionList } from './lib/manifest/ExtensionList';
import devHTMLTemplate from './templates/html';
import { UserCompileOptions as CompileOptions } from './userConfigs/UserCompileOptions/UserCompileOptions';
import { ExtensionArgument } from './lib/manifest/Extension';
import { ManifestConfigs } from './userConfigs/ManifesConfigs/ManifestConfigs';
import {
	VisibleDispatchInfo,
	isVisibleDispatchInfo,
} from './userConfigs/UserManifestConfigs/Parts/VisibleDispatchInfo';

function ensureAndGetManifestDir(compileOptions: CompileOptions) {
	const { root, outputFolder } = compileOptions;
	const manifestDir = path.join(root, outputFolder, 'CSXS');
	fsExtra.ensureDirSync(manifestDir);
	return manifestDir;
}

function writeManifestXMLFile(
	compileOptions: CompileOptions,
	manifestConfig: ManifestConfigs,
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
	manifestConfig: ManifestConfigs,
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
	dispatchInfo: VisibleDispatchInfo,
) {
	const redirectLocationHref =
		compileOptions.devHostPort !== undefined
			? `${compileOptions.devHost}:${compileOptions.devHostPort}`
			: `${compileOptions.devHost}`;
	let title = dispatchInfo?.ui?.menu?.menuName ?? 'Extension Dev Pannel';
	return devHTMLTemplate({
		title,
		redirectLocationHref,
	});
}

function writeDevPannels(
	compileOptions: CompileOptions,
	manifestConfig: ManifestConfigs,
) {
	const { root, outputFolder, isDev } = compileOptions;
	if (isDev) {
		const extensions = manifestConfig.extensions;
		for (const extension of extensions) {
			for (const dispatchInfo of extension.dispatchInfo) {
				if (isVisibleDispatchInfo(dispatchInfo)) {
					const devPannelContent = getExtensionDevPannelContent(
						compileOptions,
						dispatchInfo,
					);
					fsExtra.writeFileSync(
						path.join(root, outputFolder, `${extension.id}.html`),
						devPannelContent,
					);
				}
			}
		}
	}
}

export async function writeExtensionTemplates(
	compileOptions: CompileOptions,
	manifestConfig: ManifestConfigs,
) {
	writeManifestXMLFile(compileOptions, manifestConfig);
	writeDebugFile(compileOptions, manifestConfig);
	writeDevPannels(compileOptions, manifestConfig);
	return;
}
