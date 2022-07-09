import { CompileOptions } from '@src/lib/compileOptions/getCompileOptions';
import { existsSync } from 'fs-extra';
import path from 'path';
import { ExtensionManifestArgument } from '../manifest/ExtensionManifest';

type jsonConfig = {
	manifest: Partial<ExtensionManifestArgument>;
	compile: Partial<CompileOptions>;
};

function getPkgConfig(root?: string): Partial<jsonConfig> {
	if (root) {
		let packageJSONPath = path.join(root, '/package.json');
		if (existsSync(packageJSONPath)) {
			const config = require(packageJSONPath).cep;
			if (config === undefined) return {};
			return config;
		} else {
			console.warn('No package.json found');
			return {};
		}
	}
	return {};
}

export function getPkgManifestConfig(
	root?: string,
): Partial<ExtensionManifestArgument> {
	return getPkgConfig(root).manifest || {};
}

export function getPkgCompileConfig(root?: string): Partial<CompileOptions> {
	return getPkgConfig(root).compile || {};
}
