import path from 'path';
import { configStructure } from './typesAndValidators';
import { existsSync } from 'fs-extra';

export function getPkgCEP(root?: string): Partial<configStructure> {
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
