import {
	isUserManifestConfigs,
	UserManifestConfigs,
} from '@src/userConfigs/UserManifestConfigs/UserManifestConfigs';
import { ExtensionBundle } from '@src/userConfigs/UserManifestConfigs/Parts/ExtensionBundle';
import { ExecutionEnvironment } from '@src/userConfigs/UserManifestConfigs/Parts/ExecutionEnvironment';
import { AllExtensions } from '@src/userConfigs/UserManifestConfigs/Parts/AllExtensions';
import { blendConfigs } from '../blendConfigs';

import { exampleUserManifestConfigs } from '@tests/userConfigs/userConfigs.example';
import { getArgumentCases } from '@tests/argumentCases';

describe('isUserManifestConfigs', () => {
	it('is defined', () => {
		expect(isUserManifestConfigs).toBeDefined();
	});

	test.each(getArgumentCases())(
		'throw when given %s',
		(description, badArgument, errorMessage) => {
			expect(() => isUserManifestConfigs(badArgument)).toThrowError(
				`Validation Error: manifest (required) must be provided as a UserManifestConfigs (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#UserManifestConfigs), ${errorMessage} received`,
			);
		},
	);
	let configs: UserManifestConfigs = exampleUserManifestConfigs;
	it('passes extensionBundle to isExtensionBundle for validation and throws errors it throws', () => {
		configs = blendConfigs({
			extensionBundle: undefined as unknown as ExtensionBundle,
		});
		expect(() => isUserManifestConfigs(configs)).toThrowError(
			`Validation Error: manifest.extensionBundle (required) must be provided as an ExtensionBundle (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#ExtensionBundle), undefined (undefined) received`,
		);
	});
	it('passes executionEnvirenment to isExecutionEnvirenment for validation and throws errors it throws', () => {
		configs = blendConfigs({
			executionEnvironment: null as unknown as ExecutionEnvironment,
		});
		expect(() => isUserManifestConfigs(configs)).toThrowError(
			`Validation Error: manifest.executionEnvironment (required) must be provided as an ExecutionEnvironment (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#ExecutionEnvironment), null (null) received`,
		);
	});

	it('passes extensions to isExtensions for validation and throws errors it throws', () => {
		configs = blendConfigs({
			extensions: undefined as unknown as AllExtensions,
		});
		expect(() => isUserManifestConfigs(configs)).toThrowError(
			`Validation Error: manifest.extensions (optional) must be provided as a AllExtensions (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#AllExtensions), undefined (undefined) received`,
		);
	});

	const authorNameCases = getArgumentCases(['string', 'undefined']);

	test.each(authorNameCases.bad)(
		'throws when manifest.authorName is %s',
		(description, badArgument, errorMessage) => {
			configs = blendConfigs({
				authorName: badArgument,
			});
			expect(() => isUserManifestConfigs(configs)).toThrowError(
				`Validation Error: manifest.authorName (optional) must be provided as a string, ${errorMessage} received`,
			);
		},
	);
	test.each(authorNameCases.good)(
		"doesn't throw when manifest.authorName is %s",
		(description, goodArgument) => {
			configs = blendConfigs({
				authorName: goodArgument,
			});
			expect(() => isUserManifestConfigs(configs)).not.toThrow();
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
			expect(() => isUserManifestConfigs(configs)).toThrowError(
				`Validation Error: manifest.contact (optional) must be provided as an EmailAddress (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#EmailAddress), ${errorMessage} received`,
			);
		},
	);
	test.each(contactCases.good)(
		"doesn't throw when manifest.contact is %s",
		(description, goodArgument) => {
			configs = blendConfigs({
				contact: goodArgument,
			});
			expect(() => isUserManifestConfigs(configs)).not.toThrow();
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
			expect(() => isUserManifestConfigs(configs)).toThrowError(
				`Validation Error: manifest.legal (optional) must be provided as a URL (base node module) (https://nodejs.org/api/url.html) or a string contaning a valid complete URL, ${errorMessage} received`,
			);
		},
	);
	test.each(legalCases.good)(
		"doesn't throw when manifest.legal is %s",
		(description, goodArgument) => {
			configs = blendConfigs({
				legal: goodArgument,
			});
			expect(() => isUserManifestConfigs(configs)).not.toThrow();
		},
	);
	const abstractCases = optionalURL;
	test.each(abstractCases.bad)(
		'throws when manifest.abstract is %s',
		(description, badArgument, errorMessage) => {
			configs = blendConfigs({
				abstract: badArgument,
			});
			expect(() => isUserManifestConfigs(configs)).toThrowError(
				`Validation Error: manifest.abstract (optional) must be provided as a URL (base node module) (https://nodejs.org/api/url.html) or a string contaning a valid complete URL, ${errorMessage} received`,
			);
		},
	);
	test.each(abstractCases.good)(
		"doesn't throw when manifest.abstract is %s",
		(description, goodArgument) => {
			configs = blendConfigs({
				abstract: goodArgument,
			});
			expect(() => isUserManifestConfigs(configs)).not.toThrow();
		},
	);

	it('returns true when given a valid user manifest configs', () => {
		expect(isUserManifestConfigs(exampleUserManifestConfigs)).toBe(true);
	});
});
