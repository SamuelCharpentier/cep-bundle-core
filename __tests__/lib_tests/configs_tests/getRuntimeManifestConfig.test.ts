import { getRuntimeManifestConfig } from '@src/lib/manifestConfig/getRuntimeManifestConfig';
import path from 'path';

jest.spyOn(console, 'warn').mockImplementation();

beforeEach(() => {
	jest.resetAllMocks();
});

describe('getRuntimeManifestConfig', () => {
	let root: string | undefined;
	it('should return an empty object and warn if root is undefined', () => {
		root = undefined;
		expect(getRuntimeManifestConfig(root)).toEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`No root provided, no cep config files loaded.`,
			),
		);
	});
	it('warns when package.json file is missing', () => {
		root = path.join(__dirname, 'noPackageJSON');
		const cepConfigs = getRuntimeManifestConfig(root);
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`Could not find .cep.config.js at ${root}/.cep.config.js`,
			),
		);
	});
	it('should return empty object if no config file is at root', () => {
		root = root = path.join(__dirname, 'noCEPConfigJS');
		expect(getRuntimeManifestConfig(root)).toEqual({});
	});
	it('should warn if nothing is exported from .cep.config.js', () => {
		root = path.join(__dirname, 'noCEPConfigJSExports');
		let cepConfigs = getRuntimeManifestConfig(root);
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`No cep config present in .cep.config.js. Make sure to use a module.exports object.`,
			),
		);
	});
	it('should warn if .cep.config.js is empty', () => {
		root = path.join(__dirname, 'emptyCEPConfigJS');
		const cepConfigs = getRuntimeManifestConfig(root);
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`No cep config present in .cep.config.js. Make sure to use a module.exports object.`,
			),
		);
	});
	it('should warn if .cep.config.js exports an empty object', () => {
		root = path.join(__dirname, 'emptyCEPConfigJSObject');
		const cepConfigs = getRuntimeManifestConfig(root);
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`No cep config present in .cep.config.js. Make sure to use a module.exports object.`,
			),
		);
	});
	it('should not warn if config is found', () => {
		root = path.join(__dirname, 'CEPConfigJS');
		const cepConfigs = getRuntimeManifestConfig(root);
		expect(console.warn).not.toHaveBeenCalled();
		root = path.join(__dirname, 'CEPConfigJSExports');
	});
	it('returns the correct config', () => {
		root = path.join(__dirname, 'CEPConfigJS');
		const manifestConfig = getRuntimeManifestConfig(root);
		expect(manifestConfig).toEqual({
			executionEnvironment: {
				CSXSVersion: '[2.0, 8.0]',
				hostList: 'ALL',
				localeList: ['fr_CA', 'en_US'],
			},
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
