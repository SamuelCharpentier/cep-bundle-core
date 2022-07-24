import { getPkgCEP } from '@src/lib/getPkgCEP';
import path from 'path';

jest.spyOn(console, 'warn').mockImplementation();

describe('getPkgCEP', () => {
	it('returns an empty object if root is undefined', () => {
		root = undefined;
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toEqual({});
	});
	let root: string | undefined;
	it('warns when package.json file is missing', () => {
		root = path.join(__dirname, 'noPackageJSON');
		const cepConfigs = getPkgCEP(root);
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining('No package.json found'),
		);
	});
	it("returns an empty object when package.json doesn't contains a cep value", () => {
		root = path.join(__dirname, 'PackageJSONNoCEP');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toEqual({});
	});
	it('returns the cep value when package.json contains a cep value', () => {
		root = path.join(__dirname, 'PackageJSONNoCompileConfig');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toEqual({
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
