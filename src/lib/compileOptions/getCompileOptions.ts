import fs from 'fs';
import path from 'path';
import { DeepPartial } from '../deepPartial';
import { badArgumentError } from '../errorMessages';
import { isValidUrl } from '../typesAndValidators';
import { defaultCompileOptions } from './getDefaultOptions';

export interface CompileOptions {
	root: string;
	outputFolder: string;
	htmlFilename: string;
	devHost: URL | string;
	devHostPort?: `${number}` | number;
	isDev: boolean;
	symlink: boolean;
	debugInProduction: boolean;
}

export const getCompileOptions = (
	usersCompileOptions: DeepPartial<CompileOptions>,
): CompileOptions => {
	let compileOptions: any = {
		...defaultCompileOptions,
		...usersCompileOptions,
	};
	compileOptions.root = path.resolve(compileOptions.root);
	if (!isValidCompileOptions(compileOptions)) {
		throw new Error(
			`Invalid compile options: ${JSON.stringify(compileOptions)}`,
		);
	}
	return compileOptions;
};

function isValidCompileOptions(arg: any): arg is CompileOptions {
	const {
		root,
		outputFolder,
		htmlFilename,
		devHost,
		devHostPort,
		isDev,
		symlink,
		debugInProduction,
	} = arg;
	if (!root || fs.existsSync(root) === false) {
		throw badArgumentError('Compile root', 'valid local path', root);
	}
	if (!outputFolder || typeof outputFolder !== 'string') {
		throw badArgumentError(
			'Compile outputFolder',
			'valid local path',
			outputFolder,
		);
	}
	if (!htmlFilename && typeof htmlFilename !== 'string') {
		throw badArgumentError(
			'Compile htmlFilename',
			'a string containing the index html file of the pannel',
			htmlFilename,
		);
	}
	if (!devHost || !isValidUrl(devHost)) {
		throw badArgumentError(
			'Compile devHost',
			'a string containing the url of the dev server',
			devHost,
		);
	}
	if (
		devHostPort &&
		typeof devHostPort !== 'number' &&
		!/^[0-9]+$/.test(`${devHostPort}`)
	) {
		throw badArgumentError(
			'Compile devHostPort',
			'a number containing the port of the dev server',
			devHostPort,
		);
	}
	if (typeof isDev !== 'boolean') {
		throw badArgumentError(
			'Compile isDev',
			'a boolean indicating if the manifest is for dev context',
			isDev,
		);
	}
	if (typeof symlink !== 'boolean') {
		throw badArgumentError(
			'Compile symlink',
			'a boolean indicating if the manifest should not symlink the output folder',
			symlink,
		);
	}
	if (typeof debugInProduction !== 'boolean') {
		throw badArgumentError(
			'Compile debugInProduction',
			'a boolean indicating if the manifest should enable debug mode in production',
			debugInProduction,
		);
	}
	return true;
}
