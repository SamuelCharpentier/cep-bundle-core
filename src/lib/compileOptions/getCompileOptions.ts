import fs from 'fs';
import path from 'path';
import { badArgumentError } from '../errorMessages';
import { isValidUrl } from '../typesAndValidators';
import { defaultCompileOptions } from './getDefaultOptions';
import { CompileOptions } from '../typesAndValidators';
import { deepObjectMerge } from '../deepObjectMerge';
import { getPkgCompileOptions } from './getPkgCompileOptions';
import html from '@src/templates/html';

export const getCompileOptions = (
	compileOptionsOverrides: Partial<CompileOptions>,
): CompileOptions => {
	let root: string = defaultCompileOptions.root;
	if (
		validateCompileOptions(compileOptionsOverrides, true) &&
		compileOptionsOverrides.root !== undefined
	) {
		root = compileOptionsOverrides.root;
	}
	root = path.resolve(root);
	let compileOptions: any = deepObjectMerge(
		defaultCompileOptions,
		getPkgCompileOptions(root),
		compileOptionsOverrides,
	);

	compileOptions.root = path.resolve(compileOptions.root);
	validateCompileOptions(compileOptions);
	return compileOptions;
};

function validateCompileOptions(
	arg: any,
	partial: true,
): arg is Partial<CompileOptions>;
function validateCompileOptions(
	arg: any,
	partial?: false,
): arg is CompileOptions;
function validateCompileOptions(arg: any, partial: boolean = false) {
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
	validateRoot(partial, root);
	validateOutputFolder(partial, outputFolder);
	validateHTMLFilename(partial, htmlFilename);
	validateDevHost(partial, devHost);
	validateDevHostPort(partial, devHostPort);
	validateIsDev(partial, isDev);
	validateSymlink(partial, symlink);
	validateDebugInProduction(partial, debugInProduction);
	return true;
}
function valueHasToBeValidated(
	partial: boolean,
	value: any,
	optional: boolean = false,
): boolean {
	return (
		!(optional && value === undefined) &&
		((partial && value !== undefined) || !partial)
	);
}
function validateDebugInProduction(partial: boolean, debugInProduction: any) {
	if (
		valueHasToBeValidated(partial, debugInProduction) &&
		typeof debugInProduction !== 'boolean'
	) {
		throw badArgumentError(
			'Compile debugInProduction',
			'a boolean indicating if the manifest should enable debug mode in production',
			debugInProduction,
		);
	}
}

function validateSymlink(partial: boolean, symlink: any) {
	if (
		valueHasToBeValidated(partial, symlink) &&
		typeof symlink !== 'boolean'
	) {
		throw badArgumentError(
			'Compile symlink',
			'a boolean indicating if the manifest should not symlink the output folder',
			symlink,
		);
	}
}

function validateIsDev(partial: boolean, isDev: any) {
	if (valueHasToBeValidated(partial, isDev) && typeof isDev !== 'boolean') {
		throw badArgumentError(
			'Compile isDev',
			'a boolean indicating if the manifest is for dev context',
			isDev,
		);
	}
}

function validateDevHostPort(partial: boolean, devHostPort: any) {
	const optional = true;
	if (
		valueHasToBeValidated(partial, devHostPort, optional) &&
		typeof devHostPort !== 'number' &&
		!/^[0-9]+$/.test(`${devHostPort}`)
	) {
		throw badArgumentError(
			'Compile devHostPort',
			'a number containing the port of the dev server',
			devHostPort,
		);
	}
}

function validateDevHost(partial: boolean, devHost: any) {
	if (valueHasToBeValidated(partial, devHost) && !isValidUrl(devHost)) {
		throw badArgumentError(
			'Compile devHost',
			'a valid URL of the dev server',
			devHost,
		);
	}
}

function validateHTMLFilename(partial: boolean, htmlFilename: any) {
	if (
		valueHasToBeValidated(partial, htmlFilename) &&
		typeof htmlFilename !== 'string'
	) {
		throw badArgumentError(
			'Compile htmlFilename',
			'a string containing the html file name for the pannel (default: index.html)',
			htmlFilename,
		);
	}
}

function validateOutputFolder(
	partial: boolean,
	outputFolder: any,
): outputFolder is string {
	if (
		valueHasToBeValidated(partial, outputFolder) &&
		typeof outputFolder !== 'string'
	) {
		throw badArgumentError(
			'Compile outputFolder',
			'a valid local path',
			outputFolder,
		);
	}
	return true;
}

function validateRoot(partial: boolean, root: any): root is string {
	if (valueHasToBeValidated(partial, root) && fs.existsSync(root) === false) {
		throw badArgumentError('Compile root', 'a valid local path', root);
	}
	return true;
}
