import path from 'path';
import fs from 'fs';
import { ConfigStructure } from './typesAndValidators';
import { existsSync } from 'fs-extra';
import { DeepPartial } from './deepPartial';

const pkgFileName = 'package.json';

/**
 * Gets the CEP value of the Package.json file from the root directory.
 *
 * @export
 * @param {string} [root]
 * @return {*}  {Partial<ConfigStructure>}
 */
export function getPkgCEP(root?: string): DeepPartial<ConfigStructure> {
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
