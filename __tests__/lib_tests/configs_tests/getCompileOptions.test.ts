import { getCompileOptions } from '@src/userConfigs/UserCompileOptions/UserCompileOptions';
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

describe('getCompileOptions', () => {
	it('is defined', () => {
		expect(getCompileOptions).toBeDefined();
	});
	let root: string;
	it('returns compile options', () => {
		root = path.join(__dirname, 'Common', 'CompleteCEP');
		const configOptions = getCompileOptions({ root });
		expect(configOptions).toEqual(expectedConfigOptions);
	});
	it('accept valid overrides', () => {
		root = path.join(__dirname, 'Common', 'CompleteCEP');
		let configOptions: any;
		expect(() => {
			configOptions = getCompileOptions({
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
			getCompileOptions(invalidOverrides);
		}).toThrow(
			"Validation Error: Compile symlink must be provided as a boolean indicating if the manifest should not symlink the output folder, './example' (string) received",
		);
		invalidOverrides = {
			root,
			devHostPort: './example',
		};
		expect(() => {
			getCompileOptions(invalidOverrides);
		}).toThrow(
			"Validation Error: Compile devHostPort must be provided as a number containing the port of the dev server, './example' (string) received",
		);
		invalidOverrides = {
			root,
			isDev: './example',
		};
		expect(() => {
			getCompileOptions(invalidOverrides);
		}).toThrow(
			"Validation Error: Compile isDev must be provided as a boolean indicating if the manifest is for dev context, './example' (string) received",
		);
		invalidOverrides = {
			root,
			debugInProduction: './example',
		};
		expect(() => {
			getCompileOptions(invalidOverrides);
		}).toThrow(
			"Validation Error: Compile debugInProduction must be provided as a boolean indicating if the manifest should enable debug mode in production, './example' (string) received",
		);
		invalidOverrides = {
			root,
			outputFolder: false,
		};
		expect(() => {
			getCompileOptions(invalidOverrides);
		}).toThrow(
			'Validation Error: Compile outputFolder must be provided as a valid local path, false (boolean) received',
		);
		invalidOverrides = {
			root: false,
		};
		expect(() => {
			getCompileOptions(invalidOverrides);
		}).toThrow(
			'Validation Error: Compile root must be provided as a valid local path, false (boolean) received',
		);
		invalidOverrides = {
			devHost: {},
		};
		expect(() => {
			getCompileOptions(invalidOverrides);
		}).toThrow(
			'Validation Error: Compile devHost must be provided as a valid URL of the dev server, \n{}\n(object) received',
		);
		invalidOverrides = {
			htmlFilename: 45,
		};
		expect(() => {
			getCompileOptions(invalidOverrides);
		}).toThrow(
			'Validation Error: Compile htmlFilename must be provided as a string containing the html file name for the pannel (default: index.html), 45 (number) received',
		);
	});
});
