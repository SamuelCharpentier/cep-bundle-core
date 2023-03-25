import { getUserCompileOptions } from '@src/userConfigs/UserCompileOptions/UserCompileOptions';
import path from 'path';

jest.spyOn(console, 'warn').mockImplementation();

// this should be matching the default deep merged with the conten of the files in Common/CompleteCEP
const expectedConfigOptions = {
	debugInProduction: false,
	devHost: new URL('http://localhost'),
	htmlFilename: 'index.html',
	isDev: true,
	outputFolder: './dist',
	root: '/Users/samuelcharpentier/Documents/Programmation/Projets/cep-bundle-core/__tests__/lib_tests/configs_tests/Common/CompleteCEP',
	symlink: true,
};

describe('getUserCompileOptions', () => {
	it('is defined', () => {
		expect(getUserCompileOptions).toBeDefined();
	});
	let root: string;
	it('returns compile options', () => {
		root = path.join(__dirname, 'Common', 'CompleteCEP');
		const configOptions = getUserCompileOptions({ root });
		expect(configOptions).toEqual(expectedConfigOptions);
	});
	it('accept valid overrides', () => {
		root = path.join(__dirname, 'Common', 'CompleteCEP');
		let configOptions: any;
		expect(() => {
			configOptions = getUserCompileOptions({
				root,
				devHostPort: 8080,
				isDev: false,
				symlink: false,
				debugInProduction: true,
			});
		}).not.toThrow();
		expect(configOptions).toEqual({
			...expectedConfigOptions,
			devHostPort: 8080,
			isDev: false,
			symlink: false,
			debugInProduction: true,
		});
	});
	it('throws when overrides invalidates the rest of the options', () => {
		root = path.join(__dirname, 'Common', 'CompleteCEP');
		let invalidOverrides: any = {
			root,
			symlink: './example',
		};
		expect(() => {
			getUserCompileOptions(invalidOverrides);
		}).toThrow(
			"Validation Error: CEPBundle.compile({.compileOptions.symlink (optional) must be provided as a boolean, './example' (string) received",
		);
		invalidOverrides = {
			root,
			devHostPort: './example',
		};
		expect(() => {
			getUserCompileOptions(invalidOverrides);
		}).toThrow(
			"Validation Error: CEPBundle.compile({.compileOptions.devHostPort (optional) must be provided as a Int (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#Int), './example' (string) received",
		);
		invalidOverrides = {
			root,
			isDev: './example',
		};
		expect(() => {
			getUserCompileOptions(invalidOverrides);
		}).toThrow(
			"Validation Error: CEPBundle.compile({.compileOptions.isDev (optional) must be provided as a boolean, './example' (string) received",
		);
		invalidOverrides = {
			root,
			debugInProduction: './example',
		};
		expect(() => {
			getUserCompileOptions(invalidOverrides);
		}).toThrow(
			"Validation Error: CEPBundle.compile({.compileOptions.debugInProduction (optional) must be provided as a boolean, './example' (string) received",
		);
		invalidOverrides = {
			root,
			outputFolder: false,
		};
		expect(() => {
			getUserCompileOptions(invalidOverrides);
		}).toThrow(
			'Validation Error: CEPBundle.compile({.compileOptions.outputFolder.outputFolder (optional) must be provided as a atring contaning a valid path to a folder, false (boolean) received',
		);
		invalidOverrides = {
			root: false,
		};
		expect(() => {
			getUserCompileOptions(invalidOverrides);
		}).toThrow(
			'Validation Error: CEPBundle.compile({.compileOptions.root (optional) must be provided as a string containnig a valid path to an existing folder, false (boolean) received',
		);
		invalidOverrides = {
			devHost: {},
		};
		expect(() => {
			getUserCompileOptions(invalidOverrides);
		}).toThrow(
			'Validation Error: CEPBundle.compile({.compileOptions.devHost (optional) must be provided as a URL (base node module) (https://nodejs.org/api/url.html) or a string contaning a valid complete URL, \n{}\n(object) received',
		);
		invalidOverrides = {
			htmlFilename: 45,
		};
		expect(() => {
			getUserCompileOptions(invalidOverrides);
		}).toThrow(
			'Validation Error: CEPBundle.compile({.compileOptions.htmlFilename (optional) must be provided as a string, 45 (number) received',
		);
	});
});
