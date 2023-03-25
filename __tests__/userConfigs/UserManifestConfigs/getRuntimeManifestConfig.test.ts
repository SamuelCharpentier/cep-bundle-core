import { getRuntimeManifestConfigs } from '@src/userConfigs/UserManifestConfigs/getRuntimeManifestConfigs';
import path from 'path';

jest.spyOn(console, 'warn').mockImplementation();

beforeEach(() => {
	jest.resetAllMocks();
});

describe('getRuntimeManifestConfigs', () => {
	it('returns an empty object when root is undefined', () => {
		let undefinedRoot = undefined;
		const cepConfigs = getRuntimeManifestConfigs(undefinedRoot);
		expect(cepConfigs).toStrictEqual({});
	});
	let root: string | undefined;
	it('should return empty object if no config file is at root', () => {
		root = root = path.join(__dirname, 'Common', 'missingFile');
		expect(getRuntimeManifestConfigs(root)).toStrictEqual({});
	});
	it('should not warn if config is found', () => {
		root = path.join(__dirname, 'Common', 'completeCEP');
		const cepConfigs = getRuntimeManifestConfigs(root);
		expect(console.warn).not.toHaveBeenCalled();
	});
	it('returns the correct config', () => {
		root = path.join(__dirname, 'Common', 'completeCEP');
		const manifestConfig = getRuntimeManifestConfigs(root);
		expect(manifestConfig).toStrictEqual({
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
		});
	});
});
