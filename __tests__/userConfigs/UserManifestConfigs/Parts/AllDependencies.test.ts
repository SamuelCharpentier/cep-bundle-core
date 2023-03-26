import { DeepPartial } from '@src/lib/deepPartial';
import {
	isAllDependencies,
	AllDependencies,
} from '@src/userConfigs/UserManifestConfigs/Parts/AllDependencies';
import { Dependency } from '@src/userConfigs/UserManifestConfigs/Parts/Dependency';
import { _Extension } from '@src/userConfigs/UserManifestConfigs/Parts/Extension';
import { getArgumentCases } from '@tests/argumentCases';
import { exampleUserManifestConfigs } from '../../userConfigs.example';
import { blendConfigs as blendConfigsImported } from '../../blendConfigs';
import { VersionNumber } from '@src/lib/typesAndValidators';

const validDependency: Dependency = (
	exampleUserManifestConfigs.extensions as _Extension
).dependencyList as Dependency;

function blendConfigs(configs: DeepPartial<Dependency>): Dependency {
	if (!Object.keys(configs).includes('id')) configs.id = validDependency.id;

	return (
		blendConfigsImported({
			extensions: {
				dependencyList: configs,
			},
		}).extensions as _Extension
	).dependencyList as Dependency;
}

describe('isAllDependencies', () => {
	it('is defined', () => {
		expect(isAllDependencies).toBeDefined();
	});
	const standardThrowingArguments = getArgumentCases([
		'undefined',
		'empty object',
		'empty array',
	]);
	test.each(standardThrowingArguments.bad)(
		'throws when given %s',
		(description, badArgument, errorMessage) => {
			expect(() => {
				isAllDependencies(badArgument, [
					'isAllDependencies(',
					'dependencyList',
				]);
			}).toThrowError(
				`Validation Error: isAllDependencies(.dependencyList (optional) must be provided as a AllDependencies (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#AllDependencies), ${errorMessage} received`,
			);
		},
	);
	it('passes an argument of type object or array to isDependency and accumulates the errors and let you know what item of the array the issue came from', () => {
		let badAllDependencies: AllDependencies = blendConfigs({
			id: false as unknown as string,
		});
		expect(() =>
			isAllDependencies(badAllDependencies, [
				'isAllDependencies(',
				'dependencyList',
			]),
		).toThrowError(
			`Validation Error: isAllDependencies(.dependencyList.id (required) must be provided as String (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#String), false (boolean) received`,
		);
		badAllDependencies = [
			badAllDependencies,
			blendConfigs({
				version: false as unknown as VersionNumber,
			}),
		];
		expect(() =>
			isAllDependencies(badAllDependencies, [
				'isAllDependencies(',
				'dependencyList',
			]),
		).toThrowError(
			[
				`Validation Error: isAllDependencies(.dependencyList.[0].id (required) must be provided as String (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#String), false (boolean) received`,
				`Validation Error: isAllDependencies(.dependencyList.[1].version (optional) must be provided as VersionNumber (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VersionNumber), false (boolean) received`,
			].join('\n\n'),
		);
	});
	const validAllDependencyCases: [string, AllDependencies | undefined][] = [
		['a valid Dependency', validDependency],
		['an array of Dependency', [validDependency, validDependency]],
		['undefined', undefined],
	];
	test.each(validAllDependencyCases)(
		'returns true when given %s',
		(description, goodAllDependencies) => {
			expect(isAllDependencies(goodAllDependencies)).toBeTruthy();
		},
	);
});
