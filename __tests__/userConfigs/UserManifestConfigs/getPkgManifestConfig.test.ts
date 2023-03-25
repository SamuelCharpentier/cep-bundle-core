import { getPkgManifestConfigs } from '@src/userConfigs/UserManifestConfigs/getPkgManifestConfigs';
import path from 'path';

jest.spyOn(console, 'warn').mockImplementation();

beforeEach(() => {
	jest.resetAllMocks();
});

describe('getPkgManifestConfigs', () => {
	it('is defined', () => {
		expect(getPkgManifestConfigs).toBeDefined();
	});
	let root: string;
	it('returns an empty object if no configs are found', () => {
		root = path.join(__dirname, 'Common', 'NoManifestConfig');
		const manifestConfig = getPkgManifestConfigs(root);
		expect(manifestConfig).toStrictEqual({});
	});
	it('returns the correct config', () => {
		root = path.join(__dirname, 'Common', 'CompleteCEP');
		const manifestConfig = getPkgManifestConfigs(root);
		expect(manifestConfig).toStrictEqual({
			abstract: 'https://AwsomeExtensions.com/legal',
			authorName: 'Samuel Charpentier',
			contact: 'samuel@jaunemoutarde.ca',
			executionEnvironment: { localeList: ['fr_CA', 'en_US'] },
			extensionBundle: {
				cepVersion: '8.0',
				id: 'my.bundle',
				name: 'Awsome Extensions Bundle',
				version: '7.0',
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
							htmlPath: './index.html',
							scriptPath: './scripts/main.jsx',
						},
						ui: {
							geometry: {
								maxSize: { height: 800, width: 400 },
								minSize: { height: 400, width: 200 },
								size: { height: 600, width: 300 },
							},
							icons: { normal: './icons/normal.jpg' },
							menu: { menuName: 'My awesome extension' },
							type: 'Panel',
						},
					},
					{
						extensionData: ['This DispatchInfo is for InDesign'],
						host: 'InDesign',
						resources: {
							htmlPath: './dst/index.html',
							scriptPath: './scripts/main.jsx',
						},
						ui: {
							geometry: {
								maxSize: { height: 800, width: 400 },
								minSize: { height: 400, width: 200 },
								size: { height: 600, width: 300 },
							},
							icons: { normal: './icons/normal.jpg' },
							menu: {
								menuName: 'My awesome extension (InDesign)',
							},
							type: 'Panel',
						},
					},
				],
				hostList: [
					{ debugPort: '999', host: 'Illustrator', version: 'ALL' },
					{ debugPort: '998', host: 'InDesign', version: 12 },
				],
				id: 'my.extension',
				version: '0.0.1',
			},
			legal: 'https://AwsomeExtensions.com/legal',
		});
	});
});
