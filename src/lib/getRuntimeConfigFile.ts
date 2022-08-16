import path from 'path';
import fs from 'fs';
import { ConfigStructure } from './typesAndValidators';
import { existsSync } from 'fs-extra';

/**
 * Gets the runtime config file from the root directory.
 *
 * @export
 * @param {string} [root]
 * @return {*}  {Partial<ConfigStructure>}
 */

const runtimeConfigFileName = '.cep.config.js';

export function getRuntimeConfigFile(root?: string): Partial<ConfigStructure> {
	if (!root) {
		console.warn('No root provided, no cep config files loaded.');
		return {};
	}
	let runtimeConfigFile = path.join(root, runtimeConfigFileName);
	if (!existsSync(runtimeConfigFile)) {
		console.warn(
			`Could not find ${runtimeConfigFileName} at ${runtimeConfigFile}`,
		);
		return {};
	}
	const configFileContents = fs.readFileSync(runtimeConfigFile, 'utf8');
	if (configFileContents === '') {
		console.warn(
			`${runtimeConfigFileName} at ${runtimeConfigFile} is empty.`,
		);
		return {};
	}
	if (!configFileContents.includes('module.exports')) {
		console.warn(
			`${runtimeConfigFileName} at ${runtimeConfigFile} is not a module.exports object. Make sure to use a module.exports object.`,
		);
		return {};
	}
	let config = require(runtimeConfigFile);
	// if config is an empty object then warn and return empty object
	if (Object.keys(config).length === 0) {
		console.warn(
			`${runtimeConfigFileName} at ${runtimeConfigFile} is an empty object.`,
		);
		return {};
	}
	return config;
}
