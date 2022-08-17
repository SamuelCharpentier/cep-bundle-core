import { getPkgCEP } from '@src/lib/getPkgCEP';
import path from 'path';

jest.spyOn(console, 'warn').mockImplementation();

beforeEach(() => {
	jest.resetAllMocks();
});

describe('getPkgCEP', () => {
	it('warns when rood is undefined and returns an empty object', () => {
		root = undefined;
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringMatching(
				`No root provided, no cep config loaded from package.json.`,
			),
		);
	});
	let root: string | undefined;

	it('warns when package.json file is missing and returns an empty object', () => {
		root = path.join(__dirname, 'PackageJSON', 'MissingFile');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringMatching(
				`No package.json found at ${root}/package.json`,
			),
		);
	});
	it('warns when package.json file is empty and returns an empty object', () => {
		root = path.join(__dirname, 'PackageJSON', 'emptyFile');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringMatching(
				`package.json at ${root}/package.json is empty.`,
			),
		);
	});
	it('warns when package.json file is an empty object and returns an empty object', () => {
		root = path.join(__dirname, 'PackageJSON', 'emptyObject');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringMatching(
				`package.json at ${root}/package.json is an empty object.`,
			),
		);
	});
	it("returns an empty object when package.json doesn't contains a cep value without warning", () => {
		root = path.join(__dirname, 'PackageJSON', 'NoCEP');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toEqual({});
		expect(console.warn).not.toHaveBeenCalled();
	});
	it('warns if the cep key contains anything other than an object and return an empty object', () => {
		root = path.join(__dirname, 'PackageJSON', 'CEPNonObject');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringMatching(
				`"cep" in package.json at ${root}/package.json is not an object.`,
			),
		);
	});
	it('warns if the cep key is an empty object and return empty object', () => {
		root = path.join(__dirname, 'PackageJSON', 'CEPEmptyObject');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringMatching(
				`"cep" in package.json at ${root}/package.json is an empty object.`,
			),
		);
	});
	it('returns the cep value when package.json contains a cep value', () => {
		root = path.join(__dirname, 'PackageJSON', 'CEP');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toEqual({
			compileOptions: {
				debugInProduction: 'false',
				outputFolder: './dist',
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
