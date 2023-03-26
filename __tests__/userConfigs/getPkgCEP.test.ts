import { getPkgCEP } from '@src/userConfigs/getPkgCEP';
import fs from 'fs';
import path from 'path';

jest.spyOn(console, 'warn').mockImplementation();

beforeEach(() => {
	jest.resetAllMocks();
});

const configSourcePath = path.join(__dirname, 'ConfigSources');

const emptyPackageJSONPath = path.join(
	configSourcePath,
	'Common',
	'EmptyFile',
	'package.json',
);
// BeforeAll and AfterAll are because if a JSON file is empty, initialisation of the test will fail
beforeAll(() => {
	// Erase file PackageJSON/EmptyFile/package.json content
	fs.writeFileSync(emptyPackageJSONPath, '');
});
afterAll(() => {
	//Write to file PackageJSON/EmptyFile/package.json
	fs.writeFileSync(emptyPackageJSONPath, '{}');
});

describe('getPkgCEP', () => {
	it('warns when root is undefined and returns an empty object', () => {
		let undefinedRoot = undefined;
		const cepConfigs = getPkgCEP(undefinedRoot);
		expect(cepConfigs).toStrictEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringMatching(
				`No root provided, no cep config loaded from package.json.`,
			),
		);
	});

	let root: string | undefined;
	it('warns when package.json file is missing and returns an empty object', () => {
		root = path.join(configSourcePath, 'PackageJSON', 'MissingFile');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toStrictEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringMatching(
				`No package.json found at ${root}/package.json`,
			),
		);
	});
	it('warns when package.json file is empty and returns an empty object', () => {
		root = path.join(configSourcePath, 'Common', 'emptyFile');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toStrictEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringMatching(
				`package.json at ${root}/package.json is empty.`,
			),
		);
	});
	it('warns when package.json file is an empty object and returns an empty object', () => {
		root = path.join(configSourcePath, 'PackageJSON', 'emptyObject');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toStrictEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringMatching(
				`package.json at ${root}/package.json is an empty object.`,
			),
		);
	});
	it("returns an empty object when package.json doesn't contains a cep value without warning", () => {
		root = path.join(configSourcePath, 'PackageJSON', 'NoCEP');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toStrictEqual({});
		expect(console.warn).not.toHaveBeenCalled();
	});
	it('warns if the cep key contains anything other than an object and return an empty object', () => {
		root = path.join(configSourcePath, 'Common', 'CEPNonObject');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toStrictEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringMatching(
				`"cep" in package.json at ${root}/package.json is not an object.`,
			),
		);
	});
	it('warns if the cep key is an empty object and return empty object', () => {
		root = path.join(configSourcePath, 'Common', 'CEPEmptyObject');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toStrictEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringMatching(
				`"cep" in package.json at ${root}/package.json is an empty object.`,
			),
		);
	});
	it('returns the cep value when package.json contains a cep value', () => {
		root = path.join(configSourcePath, 'Common', 'CompleteCEP');
		const cepConfigs = getPkgCEP(root);
		expect(cepConfigs).toStrictEqual({
			compileOptions: {
				debugInProduction: false,
				outputFolder: './dist',
			},
			manifest: {
				abstract: 'https://AwsomeExtensions.com/abstract',
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
							extensionData: [
								'This DispatchInfo is for InDesign',
							],
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
						{
							debugPort: '999',
							host: 'Illustrator',
							version: 'ALL',
						},
						{ debugPort: '998', host: 'InDesign', version: 12 },
					],
					id: 'my.extension',
					version: '0.0.1',
				},
				legal: 'https://AwsomeExtensions.com/legal',
			},
		});
	});
});
