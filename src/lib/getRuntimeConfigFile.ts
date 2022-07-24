import path from 'path';
import { configStructure } from './typesAndValidators';
import { existsSync } from 'fs-extra';

export function getRuntimeConfigFile(root?: string): Partial<configStructure> {
	if (root) {
		let runtimeConfigFile = path.join(root, '.cep.config.js');
		if (existsSync(runtimeConfigFile)) {
			const config = require(runtimeConfigFile);
			if (config === undefined) return {};
			return config;
		} else {
			console.warn(
				`Could not find .cep.config.js at ${runtimeConfigFile}`,
			);
			return {};
		}
	}
	return {};
}
