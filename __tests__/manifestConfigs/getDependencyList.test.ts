import { getDependencyList } from '@src/manifestConfigs/getDependencyList';
import { AllDependencies as UserAllDependencies } from '@src/userConfigs/AllDependencies';
import { ManifestConfigs } from '@src/manifestConfigs/convertToManifestConfigs';

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
