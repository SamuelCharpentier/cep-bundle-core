import path from 'path';
import fs from 'fs';

import { existsSync } from 'fs-extra';
import { DeepPartial } from '../lib/deepPartial';
import { UserConfigs } from './UserConfigs';

const pkgFileName = 'package.json';

export function getPkgCEP(root?: string): DeepPartial<UserConfigs> {
	if (!root) {
		console.warn(
			'No root provided, no cep config loaded from package.json.',
		);
		return {};
	}
	let packageJSONPath = path.join(root, pkgFileName);
	if (!existsSync(packageJSONPath)) {
		console.warn(`No ${pkgFileName} found at ${packageJSONPath}`);
		return {};
	}
	const packageJSONContents = fs.readFileSync(packageJSONPath, 'utf8');
	if (packageJSONContents === '') {
		console.warn(`${pkgFileName} at ${packageJSONPath} is empty.`);
		return {};
	}
	const packageJSON = JSON.parse(packageJSONContents);
	if (Object.keys(packageJSON).length === 0) {
		console.warn(
			`${pkgFileName} at ${packageJSONPath} is an empty object.`,
		);
		return {};
	}
	if (!packageJSON.cep) {
		return {};
	}
	const config = packageJSON.cep;
	if (typeof config !== 'object' && !(config instanceof Array)) {
		console.warn(
			`"cep" in ${pkgFileName} at ${packageJSONPath} is not an object.`,
		);
		return {};
	}
	// if config is an empty object then warn and return empty object
	if (Object.keys(config).length === 0) {
		console.warn(
			`"cep" in ${pkgFileName} at ${packageJSONPath} is an empty object.`,
		);
		return {};
	}
	return config;
}
