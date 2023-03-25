import { getRuntimeConfigFile } from '@src/userConfigs/UserManifestConfigs/getRuntimeConfigFile';
import path from 'path';

jest.spyOn(console, 'warn').mockImplementation();

beforeEach(() => {
	jest.resetAllMocks();
});

describe('getRuntimeConfigFile', () => {
	let root: string | undefined;
	it('should return an empty object and warn if root is undefined', () => {
		root = undefined;
		expect(getRuntimeConfigFile(root)).toStrictEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`No root provided, no cep config files loaded.`,
			),
		);
	});
	it('warns when .cep.config.js file is missing and returns an empty object', () => {
		root = path.join(__dirname, 'Common', 'MissingFile');
		const cepConfigs = getRuntimeConfigFile(root);
		expect(cepConfigs).toStrictEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`Could not find .cep.config.js at ${root}/.cep.config.js`,
			),
		);
	});
	it('warns when .cep.config.js file is empty and returns an empty object', () => {
		root = path.join(__dirname, 'Common', 'EmptyFile');
		const cepConfigs = getRuntimeConfigFile(root);
		expect(cepConfigs).toStrictEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`.cep.config.js at ${root}/.cep.config.js is empty.`,
			),
		);
	});
	it('warns when .cep.config.js file is not a module.exports object and returns an empty object', () => {
		root = path.join(__dirname, 'ConfigJS', 'NoExports');
		const cepConfigs = getRuntimeConfigFile(root);
		expect(cepConfigs).toStrictEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`.cep.config.js at ${root}/.cep.config.js is not a module.exports object. Make sure to use a module.exports object.`,
			),
		);
	});
	it('warns when .cep.config.js file module.exports is not an object and returns an empty object', () => {
		root = path.join(__dirname, 'Common', 'CEPNonObject');
		const cepConfigs = getRuntimeConfigFile(root);
		expect(cepConfigs).toStrictEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`.cep.config.js at ${root}/.cep.config.js module.exports is not an object`,
			),
		);
	});
	it('warns if the exported config is an empty object and return empty object', () => {
		root = path.join(__dirname, 'Common', 'CEPEmptyObject');
		const cepConfigs = getRuntimeConfigFile(root);
		expect(cepConfigs).toStrictEqual({});
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				`.cep.config.js at ${root}/.cep.config.js is an empty object.`,
			),
		);
	});
	it('returns the config object if it is not empty', () => {
		root = path.join(__dirname, 'Common', 'CompleteCEP');
		const cepConfigs = getRuntimeConfigFile(root);
		expect(cepConfigs).toStrictEqual({
			manifest: {
				abstract: 'https://some.com/abstract',
				authorName: 'Some Author',
				contact: 'contact@some.com',
				executionEnvironment: { localeList: 'en_US' },
				extensionBundle: {
					cepVersion: 'latest',
					id: 'some.id',
					name: 'Some Extension',
					version: '0.0.0',
				},
				extensions: {
					dependencyList: { id: 'my.dependency', version: '0.0.1' },
					dispatchInfo: {
						resources: { htmlPath: './index.html' },
						ui: {
							geometry: { size: { height: '100', width: '100' } },
							menu: { menuName: 'Some Menu' },
							type: 'Panel',
						},
					},
					hostList: {
						debugPort: '8080',
						host: 'Illustrator',
						version: '20.0',
					},
					id: 'some.id',
					version: '0.0.0',
				},
				legal: 'https://some.com/legal',
			},
		});
	});
});
