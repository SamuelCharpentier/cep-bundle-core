import { VersionNumber } from '@src/lib/typesAndValidators';
import { getVersionObject } from '@src/manifestConfigs/VersionObject';
import { getArgumentCases } from '@tests/argumentCases';

type Descriptor = string;
type ArgumentValue = any;
type ExpectedValue = {
	major: number;
	minor: number | undefined;
	patch: number | undefined;
	micro: string | undefined;
};
const versionCases: [Descriptor, ArgumentValue, ExpectedValue][] = [
	[
		'a number',
		1,
		{ major: 1, minor: undefined, patch: undefined, micro: undefined },
	],
	[
		'a string with only a major version number',
		'1',
		{ major: 1, minor: undefined, patch: undefined, micro: undefined },
	],
	[
		'a string with a major and minor version number',
		'1.2',
		{ major: 1, minor: 2, patch: undefined, micro: undefined },
	],
	[
		'a string with a major, minor, and patch version number',
		'1.2.3',
		{ major: 1, minor: 2, patch: 3, micro: undefined },
	],
	[
		'a string with a major, minor, patch, and micro version number',
		'1.2.3.4a',
		{ major: 1, minor: 2, patch: 3, micro: '4a' },
	],
];

describe('getVersionObject', function () {
	test.each(versionCases)(
		'returns the correct object when given %s',
		(description, argumentValue, expectedValue) => {
			expect(getVersionObject(argumentValue)).toEqual(expectedValue);
		},
	);
});
