import { Config, getConfig } from './lib/config/getConfig';
import { enablePlayerDebugMode } from './debugMode';
import { symlinkExtension } from './symlink';
import { copyDependencies } from './copyDependencies';
import { writeExtensionTemplates } from './writeTemplates';
import { copyIcons } from './copyIcons';

export interface CompileOptions {
	root: string;
	outputFolder: string;
	htmlFilename: string;
	devHost: URL | string;
	devHostPort?: string;
	isDev: boolean;
	noSymlink: boolean;
	debugInProduction: boolean;
}

export function compile(usersCompileOption: Partial<CompileOptions>, configOverrides?: Partial<Config>) {
	const compileOptions = getCompileOptions(usersCompileOption);
	const config = getConfig(compileOptions, configOverrides);
	console.log(usersCompileOption.htmlFilename);
	let chain = Promise.resolve();
	if (usersCompileOption.isDev) {
		enablePlayerDebugMode();
		if (!usersCompileOption.noSymlink) {
			chain = chain.then(() =>
				symlinkExtension({
					bundleId: config.manifest.extensionBundle.id,
					out: compileOptions.outputFolder,
					root: compileOptions.root,
				}),
			);
		}
	}
	chain = chain
		.then(() => copyDependencies({ root: compileOptions.root, out: compileOptions.outputFolder }))
		.then(() => writeExtensionTemplates(compileOptions, config))
		.then(() => copyIcons(config))
		.then(() => {
			// noop
		});
	return chain;
}

const getCompileOptions = (usersCompileOptions: Partial<CompileOptions>): CompileOptions => {
	const defaultCompileOptions: CompileOptions = {
		root: process.cwd(),
		outputFolder: '',
		htmlFilename: 'index.html',
		devHost: 'localhost',
		isDev: true,
		noSymlink: false,
		debugInProduction: false,
	};
	let compileOptions: CompileOptions = {
		...defaultCompileOptions,
		...usersCompileOptions,
	};
	return compileOptions;
};

compile({ isDev: true, outputFolder: './myOutputFolder' }, { extensions: { id: 'some.extension.id' } });
