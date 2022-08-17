import { getRuntimeManifestConfig } from '@src/lib/manifestConfig/getRuntimeManifestConfig';
import path from 'path';

jest.spyOn(console, 'warn').mockImplementation();

beforeEach(() => {
	jest.resetAllMocks();
});

describe('getRuntimeManifestConfig', () => {
	it('returns an empty object when root is undefined', () => {
		let undefinedRoot = undefined;
		const cepConfigs = getRuntimeManifestConfig(undefinedRoot);
		expect(cepConfigs).toEqual({});
	});
	let root: string | undefined;
	it('should return empty object if no config file is at root', () => {
		root = root = path.join(__dirname, 'Common', 'missingFile');
		expect(getRuntimeManifestConfig(root)).toEqual({});
	});
	it('should not warn if config is found', () => {
		root = path.join(__dirname, 'Common', 'completeCEP');
		const cepConfigs = getRuntimeManifestConfig(root);
		expect(console.warn).not.toHaveBeenCalled();
	});
	it('returns the correct config', () => {
		root = path.join(__dirname, 'Common', 'completeCEP');
		const manifestConfig = getRuntimeManifestConfig(root);
		expect(manifestConfig).toEqual({
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
