import { getUserManifestConfigs } from '@src/userConfigs/UserManifestConfigs/UserManifestConfigs';
import path from 'path';

jest.spyOn(console, 'warn').mockImplementation();

// this should be matching the conten of the files in Common/CompleteCEP
const expectedManifestConfig = {
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
					cefParams: ['--parameter1=value1', '--enable-nodejs'],
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
					menu: { menuName: 'My awesome extension (InDesign)' },
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
};

describe('getUserManifestConfigs', () => {
	let root: string;
	it('returns a manifest config', () => {
		root = path.join(__dirname, 'Common', 'CompleteCEP');
		const manifestConfig = getUserManifestConfigs(root);
		expect(manifestConfig).toStrictEqual(expectedManifestConfig);
	});
	it('accept valid overrides', () => {
		let manifestConfig: any;
		root = path.join(__dirname, 'Common', 'CompleteCEP');
		expect(() => {
			manifestConfig = getUserManifestConfigs(root, {
				extensionBundle: {
					name: 'My Super Cool Extension - Alpha',
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

		let invalidOverrides: any = 'My Super Cool Extension - Alpha';
		expect(() => {
			getUserManifestConfigs(root, invalidOverrides, [
				'getUserManifestConfigs(',
				'manifest',
			]);
		}).toThrow(
			"Validation Error: getUserManifestConfigs(.manifest (required) must be provided as a UserManifestConfigs (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#UserManifestConfigs), 'My Super Cool Extension - Alpha' (string) received",
		);
		invalidOverrides = {
			manifest: 'My Super Cool Extension - Alpha',
		};
		expect(() => {
			getUserManifestConfigs(root, invalidOverrides, [
				'getUserManifestConfigs(',
				'manifest',
			]);
		}).toThrow(
			'Validation Error: getUserManifestConfigs(.manifest received unexpected keys: manifest\nExpected keys: extensionBundle, authorName, contact, legal, abstract, executionEnvironment, extensions',
		);
		invalidOverrides = {
			extensions: 'My Super Cool Extension - Alpha',
		};
		expect(() => {
			getUserManifestConfigs(root, invalidOverrides, [
				'getUserManifestConfigs(',
				'manifest',
			]);
		}).toThrow(
			"Validation Error: getUserManifestConfigs(.manifest.extensions (required) must be provided as an AllExtensions (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#AllExtensions), 'My Super Cool Extension - Alpha' (string) received",
		);
	});
});
