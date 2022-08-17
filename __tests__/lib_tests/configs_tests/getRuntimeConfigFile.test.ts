import { getRuntimeConfigFile } from '@src/lib/getRuntimeConfigFile';
import path from 'path';

jest.spyOn(console, 'warn').mockImplementation();

beforeEach(() => {
	jest.resetAllMocks();
});

describe('getRuntimeConfigFile', () => {
	let root: string | undefined;
	it('should return an empty object and warn if root is undefined', () => {
		root = undefined;
		expect(getRuntimeConfigFile(root)).toEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`No root provided, no cep config files loaded.`,
			),
		);
	});
	it('warns when .cep.config.js file is missing and returns an empty object', () => {
		root = path.join(__dirname, 'Common', 'MissingFile');
		const cepConfigs = getRuntimeConfigFile(root);
		expect(cepConfigs).toEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`Could not find .cep.config.js at ${root}/.cep.config.js`,
			),
		);
	});
	it('warns when .cep.config.js file is empty and returns an empty object', () => {
		root = path.join(__dirname, 'ConfigJS', 'EmptyFile');
		const cepConfigs = getRuntimeConfigFile(root);
		expect(cepConfigs).toEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`.cep.config.js at ${root}/.cep.config.js is empty.`,
			),
		);
	});
	it('warns when .cep.config.js file is not a module.exports object and returns an empty object', () => {
		root = path.join(__dirname, 'ConfigJS', 'NoExports');
		const cepConfigs = getRuntimeConfigFile(root);
		expect(cepConfigs).toEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`.cep.config.js at ${root}/.cep.config.js is not a module.exports object. Make sure to use a module.exports object.`,
			),
		);
	});
	it('warns when .cep.config.js file module.exports is not an object and returns an empty object', () => {
		root = path.join(__dirname, 'ConfigJS', 'CEPNonObject');
		const cepConfigs = getRuntimeConfigFile(root);
		expect(cepConfigs).toEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`.cep.config.js at ${root}/.cep.config.js module.exports is not an object`,
			),
		);
	});
	it('warns if the exported config is an empty object and return empty object', () => {
		root = path.join(__dirname, 'ConfigJS', 'CEPEmptyObject');
		const cepConfigs = getRuntimeConfigFile(root);
		expect(cepConfigs).toEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`.cep.config.js at ${root}/.cep.config.js is an empty object.`,
			),
		);
	});
	it('returns the config object if it is not empty', () => {
		root = path.join(__dirname, 'ConfigJS', 'CEP');
		const cepConfigs = getRuntimeConfigFile(root);
		expect(cepConfigs).toEqual({
			compileOptions: { outputFolder: './myOutputFolder' },
			extensions: {
				dependencyList: [{ id: 'my.dependency', version: '0.0.1' }],
				dispatchInfo: [
					{
						extensionData: ['This extension is awesome'],
						lifecycle: {
							startOn: [
								'applicationActivate',
								'com.adobe.csxs.events.ApplicationActivate',
							],
						},
						resources: {
							cefParams: [
								'--parameter1=value1',
								'--enable-nodejs',
							],
							mainPath: './dst/index.html',
							scriptPath: './scripts/main.jsx',
						},
						ui: {
							geometry: { minSize: { height: 400, width: 200 } },
							icons: { normal: './icons/normal.jpg' },
							menu: { menuName: 'My awesome extension' },
							type: 'Panel',
						},
					},
					{
						extensionData: ['This DispatchInfo is for InDesign'],
						host: 'InDesign',
					},
				],
				hostList: [
					{ debugPort: '999', host: 'Illustrator', version: 'ALL' },
					{ debugPort: '998', host: 'InDesign', version: 12 },
				],
				id: 'my.extension',
				version: '0.0.1',
			},
			manifest: {
				abstract: 'https://AwsomeExtensions.com/legal',
				authorName: 'Samuel Charpentier',
				contact: 'samuel@jaunemoutarde.ca',
				executionEnvironment: {
					CSXSVersion: '[2.0, 8.0]',
					hostList: 'ALL',
					localeList: ['fr_CA', 'en_US'],
				},
				extensionBundle: {
					cepVersion: '8.0',
					id: 'my.bundle',
					name: 'Awsome Extensions Bundle',
					version: '7.0',
				},
				legal: 'https://AwsomeExtensions.com/legal',
			},
		});
	});
});
