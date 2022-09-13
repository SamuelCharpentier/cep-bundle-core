import { Extension, isExtension, _Extension } from '@src/userConfigs/Extension';
import { getArgumentCases } from '@tests/argumentCases';
import { exampleUserManifestConfigs } from './userConfigs.example';
import { blendConfigs as blendConfigsImported } from './blendConfigs';
import { DeepPartial } from '@src/lib/deepPartial';
import { versionCases } from './versionCases';
import { HostEngine } from '@src/lib/enumsAndValidators';
import { VersionNumber } from '@src/lib/typesAndValidators';
import { AllDependencies } from '@src/userConfigs/AllDependencies';
import { AllDispatchInfo } from '@src/userConfigs/AllDispatchInfo';
import { HostList } from '@src/userConfigs/HostList';

function blendConfigs(badConfigs: DeepPartial<_Extension>): _Extension {
	const badObjectKeys = Object.keys(badConfigs);
	if (!badObjectKeys.includes('id')) badConfigs.id = 'generated-id';
	if (!badObjectKeys.includes('hostList'))
		badConfigs.hostList = (
			exampleUserManifestConfigs.extensions as _Extension
		).hostList;
	if (!badObjectKeys.includes('dispatchInfo'))
		badConfigs.dispatchInfo = (
			exampleUserManifestConfigs.extensions as _Extension
		).dispatchInfo;
	return blendConfigsImported({ extensions: badConfigs })
		.extensions as _Extension;
}

describe('isExtension', () => {
	it('is defined', () => {
		expect(isExtension).toBeDefined();
	});
	const badArcumentsCases = getArgumentCases(['empty object']).bad;

	test.each(badArcumentsCases)(
		'throw when given %s',
		(description, badArgument, errorMessage) => {
			expect(() => isExtension(badArgument)).toThrowError(
				`Validation Error: extension (required) must be provided as a Extension (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#Extension), ${errorMessage} received`,
			);
		},
	);
	const idCases = getArgumentCases(['string']);
	test.each(idCases.bad)(
		'throws when id is %s',
		(description, argumentValue, errorMessage) => {
			const configs = { id: argumentValue };
			expect(() => isExtension(blendConfigs(configs))).toThrowError(
				`Validation Error: extension.id (required) must be provided as a string with length > 0, ${errorMessage} received`,
			);
		},
	);
	test.each(idCases.good)(
		'returns true when id is %s',
		(description, argumentValue) => {
			const configs = { id: argumentValue };
			expect(isExtension(blendConfigs(configs))).toBe(true);
		},
	);
	test.each(versionCases.bad)(
		'throws when version is %s',
		(description, argumentValue, errorMessage) => {
			const configs = blendConfigs({ version: argumentValue });
			expect(() => isExtension(configs)).toThrow(
				`Validation Error: extension.version (optional) must be provided as VersionNumber (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#VersionNumber), ${errorMessage} received`,
			);
		},
	);
	test.each(versionCases.good)(
		'returns true when version is %s',
		(description, argumentValue) => {
			const configs = blendConfigs({ version: argumentValue });
			expect(isExtension(configs)).toBe(true);
		},
	);
	type subExtensionCase = {
		configs: DeepPartial<_Extension>;
	};
	type caseWithErrorMessage = {
		errorMessage: string;
	};

	type subExtensionCases = subExtensionCase[];
	type subExtensionCasesWithErrorMessage = (subExtensionCase &
		caseWithErrorMessage)[];

	const passingDownCases: [
		string,
		string,
		(
			| {
					good?: subExtensionCases;
					bad: subExtensionCasesWithErrorMessage;
			  }
			| {
					good: subExtensionCases;
					bad?: subExtensionCasesWithErrorMessage;
			  }
		),
	][] = [
		[
			'hostList',
			'isHostList',
			{
				good: [
					{
						configs: {
							hostList: (
								exampleUserManifestConfigs.extensions as _Extension
							).hostList,
						},
					},
				],
				bad: [
					{
						configs: {
							hostList: {
								host: 'badHost' as unknown as HostEngine,
								version:
									'badVersion' as unknown as VersionNumber,
							},
						},
						errorMessage: [
							"Validation Error: extension.hostList.host (required) must be provided as a HostEngine (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#HostEngine), 'badHost' (string) received",
							"Validation Error: extension.hostList.version (optional) must be provided as All (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#All) or a RangedVersion (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#RangedVersion), 'badVersion' (string) received",
						].join('\n\n'),
					},
				],
			},
		],
		[
			'dispatchInfo',
			'isAllDispatchInfo',
			{
				good: [
					{
						configs: {
							dispatchInfo: (
								exampleUserManifestConfigs.extensions as Extension
							).dispatchInfo,
						},
					},
				],
				bad: [
					{
						configs: {
							dispatchInfo: undefined,
						},
						errorMessage:
							'Validation Error: extension.dispatchInfo (required) must be provided as a AllDispatchInfo (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#AllDispatchInfo), undefined (undefined) received',
					},
					{
						configs: { dispatchInfo: { ui: { type: 'Panel' } } },
						errorMessage: [
							'Validation Error: extension.dispatchInfo.resources (required) must be provided as a union of a BaseResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#BaseResources) and eighter a VisibleResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#VisibleResources) or an InvisibleResources (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#InvisibleResources), undefined (undefined) received',
						].join('\n\n'),
					},
				],
			},
		],
		[
			'dependencyList',
			'isAllDepencencies',
			{
				good: [{ configs: { dependencyList: undefined } }],
				bad: [
					{
						configs: {
							dependencyList:
								'some dependencies' as unknown as AllDependencies,
						},
						errorMessage:
							"Validation Error: extension.dependencyList (optional) must be provided as a AllDependencies (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#AllDependencies), 'some dependencies' (string) received",
					},
				],
			},
		],
	];
	for (const [
		subExtensionKey,
		isSubExtensionKey,
		{ good, bad },
	] of passingDownCases) {
		if (bad !== undefined) {
			test.each(bad)(
				`passes ${subExtensionKey} to ${isSubExtensionKey} and it cumulates and throws its errors`,
				({ configs, errorMessage }) => {
					expect(() =>
						isExtension(blendConfigs(configs)),
					).toThrowError(`${errorMessage}`);
				},
			);
		}
		if (good !== undefined) {
			test.each(good)(
				`passes ${subExtensionKey} to ${isSubExtensionKey}`,
				({ configs }) => {
					expect(isExtension(blendConfigs(configs))).toBe(true);
				},
			);
		}
	}
	// it cumulates all errors
	it('cumulates all errors', () => {
		expect(() =>
			isExtension(
				blendConfigs({
					id: true as unknown as string,
					version: true as unknown as string,
					hostList: true as unknown as HostList,
					dispatchInfo: true as unknown as AllDispatchInfo,
					dependencyList: true as unknown as AllDependencies,
				} as Extension),
			),
		).toThrowError(
			[
				'Validation Error: extension.id (required) must be provided as a string with length > 0, true (boolean) received',
				'Validation Error: extension.version (optional) must be provided as VersionNumber (general type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/general-type.md#VersionNumber), true (boolean) received',
				'Validation Error: extension.hostList (required) must be provided as a HostList (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#HostList), true (boolean) received',
				'Validation Error: extension.dispatchInfo (required) must be provided as a AllDispatchInfo (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#AllDispatchInfo), true (boolean) received',
				'Validation Error: extension.dependencyList (optional) must be provided as a AllDependencies (user manifest configs type) (https://github.com/SamuelCharpentier/cep-bundle-core/blob/main/docs/user-manifest-configs-type.md#AllDependencies), true (boolean) received',
			].join('\n\n'),
		);
	});
	it('returns true when given a valid Extension', () => {
		expect(
			isExtension(exampleUserManifestConfigs.extensions as _Extension),
		).toBeTruthy();
	});
});
