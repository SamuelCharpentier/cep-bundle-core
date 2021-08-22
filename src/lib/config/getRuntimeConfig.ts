import { existsSync } from 'fs-extra';
import path from 'path';

export function getRuntimeConfig(root: string): { [key: string]: any } {
	let runtimeConfigFile = path.join(root, '.cep.config.js');
	if (existsSync(runtimeConfigFile)) {
		const config = require(runtimeConfigFile);
		return config;
	} else {
		console.warn(`Could not find .ceprc.js at ${runtimeConfigFile}`);
		return {};
	}
}
