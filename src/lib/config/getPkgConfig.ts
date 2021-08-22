import { existsSync } from 'fs-extra';
import path from 'path';

export function getPkgConfig(root: string): { [key: string]: any } {
	let packageJSONPath = path.join(root, '/package.json');
	if (existsSync(packageJSONPath)) {
		const config = require(packageJSONPath).cep;
		return config;
	} else {
		throw new Error(`Could not proceed without package.json at ${packageJSONPath}`);
	}
}
