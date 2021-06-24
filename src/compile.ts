import path from 'path';

import { getProcessEnvConfig } from './config/getProcessEnvConfig';
import { getConfig } from './config/getConfig';

interface CompileOptions {
	env?: string;
	root?: string;
	htmlFilename?: string;
	isDev?: boolean;
	pkg?: any;
}

export function compile(parameterConfig?: CompileOptions) {
	const config = getConfig(parameterConfig);
	parameterConfig = { ...parameterConfig };

	let defaultConfig = getConfigDefaults();

	let pgkConfig = require(path.join(
		parameterConfig.root ? parameterConfig.root : process.cwd(),
		'/package.json',
	)).cep;

	let processEnvVarConfig = getProcessEnvConfig();

	let combinedConfig = { ...defaultConfig, ...pgkConfig, ...processEnvVarConfig, ...parameterConfig };

	let cepEnvConfig = combinedConfig[combinedConfig.env];

	combinedConfig = { ...combinedConfig, ...cepEnvConfig };
	return;
	/* parameterConfig.htmlFilename = parameterConfig.htmlFilename ? parameterConfig.htmlFilename : './index.html';
	parameterConfig.pkg = parameterConfig.pkg
		? parameterConfig.pkg
		: require(path.join(parameterConfig.root, '/package.json'));
	parameterConfig.isDev = parameterConfig.hasOwnProperty('isDev') ? confjig.isDev : false;
	const config = getConfig(parameterConfig.pkg, parameterConfig.env);
	const allOpts = {
		...parameterConfig,
		...parameterConfig,
	};
	let chain = Promise.resolve();
	if (parameterConfig.isDev) {
		enablePlayerDebugMode();
		if (!parameterConfig.noSymlink) {
			chain = chain.then(() => symlinkExtension(allOpts));
		}
	}
	chain = chain
		.then(() => copyDependencies(allOpts))
		.then(() => writeExtensionTemplates(allOpts))
		.then(() => copyIcons(allOpts))
		.then(() => {
			// noop
		});
	return chain; */
}

compile();
