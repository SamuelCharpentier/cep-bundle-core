import { getDependencyList } from '@src/userConfigs/ManifesConfigs/convertManifestConfigs/getDependencyList';
import { AllDependencies as UserAllDependencies } from '@src/userConfigs/UserManifestConfigs/Parts/AllDependencies';
import { ManifestConfigs } from '@src/userConfigs/ManifesConfigs/ManifestConfigs';

type Descriptor = string;
type ArgumentValue = UserAllDependencies | undefined;
type ExpectedValue = ManifestConfigs['extensions'][0]['dependencyList'];

const cases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	['undefined', undefined, undefined],
	[
		'a single dependency object',
		{
			id: 'com.adobe.extension.test',
			version: '1.0.0',
		},
		[
			{
				id: 'com.adobe.extension.test',
				version: '1.0.0',
			},
		],
	],
	[
		'an array of dependency objects',
		[
			{
				id: 'com.adobe.extension.test',
				version: '1.0.0',
			},
			{
				id: 'com.adobe.extension.test2',
				version: '1.0.0',
			},
		],
		[
			{
				id: 'com.adobe.extension.test',
				version: '1.0.0',
			},
			{
				id: 'com.adobe.extension.test2',
				version: '1.0.0',
			},
		],
	],
];

describe('getDependencyList', () => {
	it('is defined', () => {
		expect(getDependencyList).toBeDefined();
	});

	test.each(cases)(
		'getDependencyList returns correct dependency object given %s',
		(descriptor, argumentValue, expectedValue) => {
			expect(getDependencyList(argumentValue)).toEqual(expectedValue);
		},
	);
});
