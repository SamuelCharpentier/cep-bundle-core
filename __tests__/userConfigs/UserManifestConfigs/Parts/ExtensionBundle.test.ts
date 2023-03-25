import {
	ExtensionBundle,
	isExtensionBundle,
} from '@src/userConfigs/UserManifestConfigs/Parts/ExtensionBundle';
import { getArgumentCases } from '@tests/argumentCases';
import { blendConfigs as blendConfigsImported } from './blendConfigs';
import { DeepPartial } from '@src/lib/deepPartial';
import { CEPVersion } from '@src/lib/enumsAndValidators';
import { versionCases } from './versionCases';

function blendConfigs(
	badConfigs: DeepPartial<ExtensionBundle>,
): ExtensionBundle {
	if (!Object.keys(badConfigs).includes('id')) badConfigs.id = 'generated-id';
	return blendConfigsImported({ extensionBundle: badConfigs })
		.extensionBundle;
}
describe('isExtensionBundle', () => {
	it('is Defined', () => {
		expect(isExtensionBundle).toBeDefined();
	});
	const standardThrowingArguments = getArgumentCases(['empty object']).bad;
	test.each(standardThrowingArguments)(
		'throws when given %s',
		(description, badArgument, errorMessage) => {
			expect(() => isExtensionBundle(badArgument)).toThrowError(
				`Validation Error: manifest.extensionBundle (required) must be provided as an ExtensionBundle (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#ExtensionBundle), ${errorMessage} received`,
			);
		},
	);
	const idCases = getArgumentCases(['string']);
	test.each(idCases.bad)(
		'throws when id is %s',
		(description, argumentValue, errorMessage) => {
			const configs = { id: argumentValue };
			expect(() => isExtensionBundle(blendConfigs(configs))).toThrowError(
				`Validation Error: manifest.extensionBundle.id (required) must be provided as a string, ${errorMessage} received`,
			);
		},
	);
	test.each(idCases.good)(
		"doesn't throw when id is %s",
		(description, argumentValue) => {
			const configs = { id: argumentValue };
			expect(() =>
				isExtensionBundle(blendConfigs(configs)),
			).not.toThrow();
		},
	);
	test.each(versionCases.bad)(
		'throws when version is %s',
		(description, argumentValue, errorMessage) => {
			const configs = blendConfigs({ version: argumentValue });
			expect(() => isExtensionBundle(configs)).toThrow(
				`Validation Error: manifest.extensionBundle.version (optional) must be provided as a VersionNumber (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VersionNumber), ${errorMessage} received`,
			);
		},
	);
	test.each(versionCases.good)(
		"doesn't throw when version is %s",
		(description, argumentValue) => {
			const configs = blendConfigs({ version: argumentValue });
			expect(() => isExtensionBundle(configs)).not.toThrow();
		},
	);
	const nameCases = getArgumentCases(['undefined', 'string']);
	test.each(nameCases.bad)(
		'throws when name is %s',
		(description, argumentValue, errorMessage) => {
			const configs = blendConfigs({ name: argumentValue });
			expect(() => isExtensionBundle(configs)).toThrow(
				`Validation Error: manifest.extensionBundle.name (optional) must be provided as a string, ${errorMessage} received`,
			);
		},
	);
	test.each(nameCases.good)(
		"doesn't throw when name is %s",
		(description, argumentValue) => {
			const configs = blendConfigs({ name: argumentValue });
			expect(() => isExtensionBundle(configs)).not.toThrow();
		},
	);
	const cepVersionCases = getArgumentCases(['undefined'], {
		good: [
			['CEPVersion', CEPVersion.latest, ''],

			['key of CEPVersion.latest', 'latest', ''],
			["value of CEPVersion.['10.0']", '10.0', ''],
			["key of CEPVersion.['v11.0']", 'v11.0', ''],
			["CEPVersion['v11.0']", CEPVersion['v11.0'], ''],
		],
		bad: [['invalid CEPVersion', '-10.0', '"-10.0" (string)']],
	});
	test.each(cepVersionCases.bad)(
		'throws when cepVersion is %s',
		(description, argumentValue, errorMessage) => {
			const configs = blendConfigs({ cepVersion: argumentValue });
			expect(() => isExtensionBundle(configs)).toThrow(
				`Validation Error: manifest.extensionBundle.cepVersion (optional) must be provided as a CEPVersion (enum) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/enum.md#CEPVersion),`,
			);
		},
	);
	test.each(cepVersionCases.good)(
		"doesn't throw when cepVersion is %s",
		(description, argumentValue) => {
			const configs = blendConfigs({ cepVersion: argumentValue });
			expect(() => isExtensionBundle(configs)).not.toThrow();
		},
	);
	it('accumulates all errors and throw them, separated by two line end', () => {
		const configs = {
			id: true,
			version: true,
			name: true,
			cepVersion: true,
		};
		expect(() => isExtensionBundle(configs)).toThrow(
			[
				`Validation Error: manifest.extensionBundle.id (required) must be provided as a string, true (boolean) received`,
				`Validation Error: manifest.extensionBundle.version (optional) must be provided as a VersionNumber (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VersionNumber), true (boolean) received`,
				`Validation Error: manifest.extensionBundle.name (optional) must be provided as a string, true (boolean) received`,
				`Validation Error: manifest.extensionBundle.cepVersion (optional) must be provided as a CEPVersion (enum) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/enum.md#CEPVersion), true (boolean) received`,
			].join('\n\n'),
		);
	});
});
