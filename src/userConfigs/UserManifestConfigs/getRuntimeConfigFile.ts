import path from 'path';
import fs from 'fs';
import { existsSync } from 'fs-extra';
import { UserConfigs } from '../UserConfigs';

const runtimeConfigFileName = '.cep.config.js';

/**
 * Gets the runtime config file from the root directory.
 *
 * @export
 * @param {string} [root]
 * @return {*}  {Partial<ConfigStructure>}
 */
export function getRuntimeConfigFile(root?: string): Partial<UserConfigs> {
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
	if (typeof config !== 'object') {
		console.warn(
			`${runtimeConfigFileName} at ${runtimeConfigFile} module.exports is not an object. Make sure to use a module.exports object.`,
		);
		return {};
	}
	if (Object.keys(config).length === 0) {
		console.warn(
			`${runtimeConfigFileName} at ${runtimeConfigFile} is an empty object.`,
		);
		return {};
	}
	return config;
}
