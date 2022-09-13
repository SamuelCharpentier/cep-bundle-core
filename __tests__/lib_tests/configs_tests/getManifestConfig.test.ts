import { getManifestConfig } from '@src/lib/manifestConfig/getManifestConfig';
import path from 'path';

jest.spyOn(console, 'warn').mockImplementation();

// this should be matching the conten of the files in Common/CompleteCEP
const expectedManifestConfig = {
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
					cefParams: ['--parameter1=value1', '--enable-nodejs'],
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
	legal: 'https://AwsomeExtensions.com/legal',
};

describe('getManifestConfig', () => {
	let root: string;
	it('returns a manifest config', () => {
		root = path.join(__dirname, 'Common', 'CompleteCEP');
		const manifestConfig = getManifestConfig(root);
		expect(manifestConfig).toStrictEqual(expectedManifestConfig);
	});
	it('accept valid overrides', () => {
		let manifestConfig: any;
		root = path.join(__dirname, 'Common', 'CompleteCEP');
		expect(() => {
			manifestConfig = getManifestConfig(root, {
				manifest: {
					extensionBundle: {
						name: 'My Super Cool Extension - Alpha',
					},
				},
			});
		}).not.toThrow();
		expect(manifestConfig).toStrictEqual({
			...expectedManifestConfig,
			...{
				extensionBundle: {
					...expectedManifestConfig.extensionBundle,
					name: 'My Super Cool Extension - Alpha',
				},
			},
		});
	});
	it('throws when overrides invalidates the rest of the configs', () => {
		root = path.join(__dirname, 'Common', 'CompleteCEP');
		let invalidOverrides: any = {
			manifest: 'My Super Cool Extension - Alpha',
		};

		expect(() => {
			getManifestConfig(root, invalidOverrides);
		}).toThrow(
			"Validation Error: manifest configs must be provided as a ManifestArgument (type), 'My Super Cool Extension - Alpha' (string) received",
		);
		invalidOverrides = {
			extensions: 'My Super Cool Extension - Alpha',
		};
		expect(() => {
			getManifestConfig(root, invalidOverrides);
		}).toThrow(
			"Validation Error: extension configs must be provided as a ExtensionListArgument (type), 'My Super Cool Extension - Alpha' (string) received",
		);
	});
});
