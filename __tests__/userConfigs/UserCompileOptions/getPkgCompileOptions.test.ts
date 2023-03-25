import { getPkgCompileOptions } from '@src/userConfigs/UserCompileOptions/getPkgCompileOptions';
import fs from 'fs';
import path from 'path';

jest.spyOn(console, 'warn').mockImplementation();

const configSourcePath = path.join(
	path.resolve(path.join(__dirname, '..')),
	'ConfigSources',
);

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

describe('getPkgCompileOptions', () => {
	it('is defined', () => {
		expect(getPkgCompileOptions).toBeDefined();
	});
	let root: string;
	it('returns an empty object if no configs are found', () => {
		root = path.join(configSourcePath, 'Common', 'NoManifestConfig');
		const compileOptions = getPkgCompileOptions(root);
		expect(compileOptions).toStrictEqual({});
	});
	it('returns an empty object if no compile config', () => {
		root = path.join(configSourcePath, 'Common', 'NoCompileConfig');
		const compileOptions = getPkgCompileOptions(root);
		expect(compileOptions).toStrictEqual({});
	});
	it("returns an empty object if there's no compile config in the package.json file", () => {
		root = path.join(configSourcePath, 'Common', 'NoCompileConfig');
		const compileOptions = getPkgCompileOptions(root);
		expect(compileOptions).toStrictEqual({});
	});
	it('returns the correct config', () => {
		root = path.join(configSourcePath, 'Common', 'CompleteCEP');
		const compileOptions = getPkgCompileOptions(root);
		expect(compileOptions).toStrictEqual({
			outputFolder: './dist',
			debugInProduction: false,
		});
	});
});
