import {
	UserManifestConfigs,
	getUserManifestConfigs,
} from '@src/userConfigs/UserManifestConfigs/UserManifestConfigs';
import { getArgumentCases } from '@tests/argumentCases';
import path from 'path';
import { exampleUserManifestConfigs } from '@tests/userConfigs/userConfigs.example';
import { blendConfigs } from '../blendConfigs';

jest.spyOn(console, 'warn').mockImplementation();

// this should be matching the conten of the files in Common/CompleteCEP
const expectedManifestConfig = {
	extensionBundle: {
		id: 'some.id',
		version: '0.0.0',
		name: 'Some Extension',
		cepVersion: 'latest',
	},
	authorName: 'Some Author',
	contact: 'contact@some.com',
	legal: 'https://some.com/legal',
	abstract: 'https://some.com/abstract',
	executionEnvironment: {
		localeList: 'en_US',
	},
	extensions: {
		id: 'some.id',
		version: '0.0.0',
		hostList: {
			host: 'Illustrator',
			version: '20.0',
			debugPort: '8080',
		},
		dispatchInfo: {
			resources: {
				htmlPath: './index.html',
			},
			ui: {
				type: 'Panel',
				menu: {
					menuName: 'Some Menu',
				},
				geometry: {
					size: {
						width: '100',
						height: '100',
					},
				},
			},
		},
		dependencyList: {
			id: 'my.dependency',
			version: '0.0.1',
		},
	},
};

const configSourcePath = path.join(
	path.resolve(path.join(__dirname, '..')),
	'ConfigSources',
);

describe('getUserManifestConfigs', () => {
	it('is defined', () => {
		expect(getUserManifestConfigs).toBeDefined();
	});

	const completeCEPRoot: string = path.join(
		configSourcePath,
		'Common',
		'CompleteCEP',
	);
	test.each(getArgumentCases(['empty object', 'undefined']).bad)(
		'throw when given %s',
		(description, badArgument, errorMessage) => {
			expect(() =>
				getUserManifestConfigs(completeCEPRoot, badArgument, [
					'getUserManifestConfigs(',
					'manifest',
				]),
			).toThrowError(
				`Validation Error: getUserManifestConfigs(.manifest (required) must be provided as a UserManifestConfigs (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#UserManifestConfigs), ${errorMessage} received`,
			);
		},
	);
	it('throws when the function argument for the manifest configs have unexpected keys', () => {
		let invalidOverrides: any = {
			manifest: 'My Super Cool Extension - Alpha',
		};
		expect(() => {
			getUserManifestConfigs(completeCEPRoot, invalidOverrides, [
				'getUserManifestConfigs(',
				'manifest',
			]);
		}).toThrow(
			'Validation Error: getUserManifestConfigs(.manifest received unexpected keys: manifest\nExpected keys: extensionBundle, authorName, contact, legal, abstract, executionEnvironment, extensions',
		);
	});
	let configs: UserManifestConfigs = exampleUserManifestConfigs;
	it('passes extensionBundle to isExtensionBundle for validation and throws errors it throws', () => {
		configs = blendConfigs({
			extensionBundle: null as any,
		});
		expect(() =>
			getUserManifestConfigs(completeCEPRoot, configs, [
				'getUserManifestConfigs(',
				'manifest',
			]),
		).toThrowError(
			`Validation Error: getUserManifestConfigs(.manifest.extensionBundle (required) must be provided as an ExtensionBundle (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#ExtensionBundle), null (null) received`,
		);
	});
	it('passes executionEnvirenment to isExecutionEnvirenment for validation and throws errors it throws', () => {
		configs = blendConfigs({
			executionEnvironment: null as any,
		});
		expect(() =>
			getUserManifestConfigs(completeCEPRoot, configs, [
				'getUserManifestConfigs(',
				'manifest',
			]),
		).toThrowError(
			`Validation Error: getUserManifestConfigs(.manifest.executionEnvironment (required) must be provided as an ExecutionEnvironment (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#ExecutionEnvironment), null (null) received`,
		);
	});
	it('passes extensions to isExtensions for validation and throws errors it throws', () => {
		configs = blendConfigs({
			extensions: null as any,
		});
		expect(() =>
			getUserManifestConfigs(completeCEPRoot, configs, [
				'getUserManifestConfigs(',
				'manifest',
			]),
		).toThrowError(
			`Validation Error: getUserManifestConfigs(.manifest.extensions (optional or required depending on the context) must be provided as an AllExtensions (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#AllExtensions), null (null) received`,
		);
	});

	const authorNameCases = getArgumentCases(['string', 'undefined']);

	test.each(authorNameCases.bad)(
		'throws when manifest.authorName is %s',
		(description, badArgument, errorMessage) => {
			configs = blendConfigs({
				authorName: badArgument,
			});
			expect(() =>
				getUserManifestConfigs(completeCEPRoot, configs, [
					'getUserManifestConfigs(',
					'manifest',
				]),
			).toThrowError(
				`Validation Error: getUserManifestConfigs(.manifest.authorName (optional) must be provided as a string, ${errorMessage} received`,
			);
		},
	);
	test.each(authorNameCases.good)(
		"doesn't throw when manifest.authorName is %s",
		(description, goodArgument) => {
			configs = blendConfigs({
				authorName: goodArgument,
			});
			expect(() =>
				getUserManifestConfigs(completeCEPRoot, configs, [
					'getUserManifestConfigs(',
					'manifest',
				]),
			).not.toThrow();
		},
	);
	const contactCases = getArgumentCases(['undefined'], {
		good: ['an EmailAdress', 'example.01@email.com', 'an EmailAdress'],
	});
	test.each(contactCases.bad)(
		'throws when manifest.contact is %s',
		(description, badArgument, errorMessage) => {
			configs = blendConfigs({
				contact: badArgument,
			});
			expect(() =>
				getUserManifestConfigs(completeCEPRoot, configs, [
					'getUserManifestConfigs(',
					'manifest',
				]),
			).toThrowError(
				`Validation Error: getUserManifestConfigs(.manifest.contact (optional) must be provided as an EmailAddress (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#EmailAddress), ${errorMessage} received`,
			);
		},
	);
	test.each(contactCases.good)(
		"doesn't throw when manifest.contact is %s",
		(description, goodArgument) => {
			configs = blendConfigs({
				contact: goodArgument,
			});
			expect(() =>
				getUserManifestConfigs(completeCEPRoot, configs, [
					'getUserManifestConfigs(',
					'manifest',
				]),
			).not.toThrow();
		},
	);
	const optionalURL = getArgumentCases(['undefined'], {
		good: [
			[
				'a URL as a string',
				'https://example.com',
				"'https://example.com' (string)",
			],
			[
				'a URL instance',
				new URL('https://example.com'),
				'URL (instance of URL)',
			],
		],
	});

	const legalCases = optionalURL;
	test.each(legalCases.bad)(
		'throws when manifest.legal is %s',
		(description, badArgument, errorMessage) => {
			configs = blendConfigs({
				legal: badArgument,
			});
			expect(() =>
				getUserManifestConfigs(completeCEPRoot, configs, [
					'getUserManifestConfigs(',
					'manifest',
				]),
			).toThrowError(
				`Validation Error: getUserManifestConfigs(.manifest.legal (optional) must be provided as a URL (base node module) (https://nodejs.org/api/url.html) or a string contaning a valid complete URL, ${errorMessage} received`,
			);
		},
	);
	test.each(legalCases.good)(
		"doesn't throw when manifest.legal is %s",
		(description, goodArgument) => {
			configs = blendConfigs({
				legal: goodArgument,
			});
			expect(() =>
				getUserManifestConfigs(completeCEPRoot, configs, [
					'getUserManifestConfigs(',
					'manifest',
				]),
			).not.toThrow();
		},
	);
	const abstractCases = optionalURL;
	test.each(abstractCases.bad)(
		'throws when manifest.abstract is %s',
		(description, badArgument, errorMessage) => {
			configs = blendConfigs({
				abstract: badArgument,
			});
			expect(() =>
				getUserManifestConfigs(completeCEPRoot, configs, [
					'getUserManifestConfigs(',
					'manifest',
				]),
			).toThrowError(
				`Validation Error: getUserManifestConfigs(.manifest.abstract (optional) must be provided as a URL (base node module) (https://nodejs.org/api/url.html) or a string contaning a valid complete URL, ${errorMessage} received`,
			);
		},
	);
	test.each(abstractCases.good)(
		"doesn't throw when manifest.abstract is %s",
		(description, goodArgument) => {
			configs = blendConfigs({
				abstract: goodArgument,
			});
			expect(() =>
				getUserManifestConfigs(completeCEPRoot, configs, [
					'getUserManifestConfigs(',
					'manifest',
				]),
			).not.toThrow();
		},
	);

	it('returns a manifest config', () => {
		const manifestConfig = getUserManifestConfigs(completeCEPRoot);
		expect(manifestConfig).toStrictEqual(expectedManifestConfig);
	});
	it('accept valid overrides', () => {
		let manifestConfig: any;
		expect(() => {
			manifestConfig = getUserManifestConfigs(completeCEPRoot, {
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
});
