import { DeepPartial } from '@src/lib/deepPartial';
import {
	Dependency,
	isDependency,
} from '@src/userConfigs/UserManifestConfigs/Parts/Dependency';
import { _Extension } from '@src/userConfigs/UserManifestConfigs/Parts/Extension';
import { getArgumentCases } from '@tests/argumentCases';
import { versionCases } from '@tests/userConfigs/versionCases';
import { blendConfigs as blendConfigsImported } from './blendConfigs';
import { exampleUserManifestConfigs } from './userConfigs.example';

function blendConfigs(partialConfigs: DeepPartial<Dependency>): Dependency {
	const partialConfigObjectKeys = Object.keys(partialConfigs);
	if (!partialConfigObjectKeys.includes('id'))
		partialConfigs.id = 'generated.id';
	return (
		blendConfigsImported({
			extensions: {
				...(exampleUserManifestConfigs.extensions as _Extension),
				dependencyList: partialConfigs,
			},
		}).extensions as _Extension
	).dependencyList as Dependency;
}

describe('isDependency', () => {
	it('is defined', () => {
		expect(isDependency).toBeDefined();
	});
	const standardThrowingArguments = getArgumentCases(['empty object']).bad;
	test.each(standardThrowingArguments)(
		'throws when given %s',
		(description, badDependency, errorMessage) => {
			expect(() => isDependency(badDependency)).toThrowError(
				`Validation Error: dependencyList (optional) must be provided as a Dependency (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Dependency), ${errorMessage} received`,
			);
		},
	);
	const idCases = getArgumentCases(['string']);
	test.each(idCases.bad)(
		'throws when given %s',
		(description, id, errorMessage) => {
			expect(() => {
				isDependency(blendConfigs({ id }));
			}).toThrowError(
				`Validation Error: dependencyList.id (required) must be provided as String (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#String), ${errorMessage} received`,
			);
		},
	);
	test.each(idCases.good)('returns true when given %s', (description, id) => {
		expect(isDependency(blendConfigs({ id }))).toBeTruthy();
	});

	test.each(versionCases.bad)(
		'throws when given %s',
		(description, version, errorMessage) => {
			expect(() => {
				isDependency(blendConfigs({ version }));
			}).toThrowError(
				`Validation Error: dependencyList.version (optional) must be provided as VersionNumber (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VersionNumber), ${errorMessage} received`,
			);
		},
	);
	test.each(versionCases.good)(
		'returns true when given %s',
		(description, version) => {
			expect(isDependency(blendConfigs({ version }))).toBeTruthy;
		},
	);
});
